const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

async function authMiddleware(req, res, next) {
    try {
        const token = req.headers['x-auth-token'];
        if (token == null) return res.sendStatus(401).json({ msg: "No token, authorization denied" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.id;
        const Admin = mongoose.model("Admin");
        const Role = mongoose.model("Role");
        const user = await Admin.findById(adminId).select("-password");
        if (!user) {
            return res.status(401).json({ msg: "Token is not valid" });
        }
        const role = user.rolename;
        if (role == 'superadmin') {
            req.myPermissions = 'superadmin';
            next();
        } else {
            req.myPermissions = await Role.findOne({ rolename: role }).lean().exec();
            next();
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
}

function authPerm(name, perm) {

    return (req, res, next) => {
        switch (perm) {
            case 'view':
                if (!(
                    req.myPermissions == 'superadmin' ||
                    req.myPermissions['view'].includes(name) ||
                    req.myPermissions['update'].includes(name) ||
                    req.myPermissions['delete'].includes(name) ||
                    req.myPermissions['create'].includes(name)
                )) {
                    return res.status(401).json({
                        message: `You are not Authorized to view ${name}`,
                        permissions: req.myPermissions
                    });
                } else {
                    next();
                }
                break;
            case 'update':
                if (!(
                    req.myPermissions == 'superadmin' ||
                    req.myPermissions['update'].includes(name)
                )) {
                    console.log(name, perm);
                    return res.status(401).json({
                        message: `You are not Authorized to update ${name}`,
                        permissions: req.myPermissions
                    });
                } else {
                    next();
                }
                break;
            case 'delete':
                if (!(
                    req.myPermissions == 'superadmin' ||
                    req.myPermissions['delete'].includes(name)
                )) {
                    console.log(name, perm);
                    return res.status(401).json({
                        message: `You are not Authorized to delete ${name}`,
                        permissions: req.myPermissions
                    });
                } else {
                    next();
                }
                break;
            case 'create':
                if (!(
                    req.myPermissions == 'superadmin' ||
                    req.myPermissions['create'].includes(name)
                )) {
                    console.log(name, perm);
                    return res.status(401).json({
                        message: `You are not Authorized to create ${name}`,
                        permissions: req.myPermissions
                    });
                } else {
                    next();
                }
                break;
            default:
                next();
        }
    }

}

module.exports = {
    authMiddleware,
    authPerm
}
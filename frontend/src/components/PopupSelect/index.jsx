import React, { useEffect, useState } from "react";
import "./style.css";

import { Input, Select } from 'antd';
import { Checkbox } from 'antd';

const { Search } = Input;

export default function PopupSelect(props) {
    const {
        service,
        setService,
        url,
        budget,
        setBudget,
        quantity,
        setQuantity,
        vendorPrice,
        setVendorPrice,
        customService,
        setCustomService,
        result,
        setResult,
        client
    } = props;

    const [popup, setPopup] = useState(false);
    const [filter, setFilter] = useState();
    const [csId, setCsId] = useState(0);
    const [sBudget, setSBudget] = useState(0);
    const [csBudget, setCsBudget] = useState(0)

    let checked = (res) => service.map(s => s[0]).includes(res._id);

    useEffect(() => {
        if (service && quantity && result) {
            setBudget(budget => {
                let sb = 0, csb = 0;
                const idList = service.map(s => s[0]);
                for (let i = 0; i < idList.length; i++) {
                    let price = result.filter(res => res._id == idList[i])[0].vendorPrice;
                    let q = quantity[idList[i]];
                    if (!q) {
                        q = 0;
                    }
                    sb += q * price;
                }
                customService.forEach((cs) => {
                    csb += cs.vendorprice * cs.quantity
                })
                return csb + sb;
            });
            setSBudget(budget => {
                let sb = 0;
                const idList = service.map(s => s[0]);
                for (let i = 0; i < idList.length; i++) {
                    let price = result.filter(res => res._id == idList[i])[0].vendorPrice;
                    let q = quantity[idList[i]];
                    if (!q) {
                        q = 0;
                    }
                    sb += q * price;
                }
                return sb;
            });
            setCsBudget(budget => {
                let csb = 0;
                customService.forEach((cs) => {
                    csb += cs.vendorprice * cs.quantity
                });
                return csb;
            });
        }
    }, [quantity, service, customService]);

    useEffect(() => {
        setCsId(csId => csId + 1)
        return;
    }, [customService])

    const handlePopup = () => {
        if (!popup) {
            setFilter();
        }
        setPopup(!popup);
    }

    const handleSearch = (value) => {
        setFilter(value);
    }

    const handleQuantity = (e) => {
        if (e.target.value > 0) {
            setQuantity(q => {
                q[e.target.name] = e.target.value;
                return { ...quantity, ...q };
            })
        } else {
            setQuantity(q => {
                delete q[e.target.name];
                return { ...q };
            })
        }
    }

    const handleCheck = (e) => {
        const res = result.filter(res => res._id == e.target.name)[0];
        const name = res.productName;
        const price = res.vendorPrice;

        if (e.target.checked) {
            setVendorPrice(vp => {
                vp[res._id] = price;
                return { ...vendorPrice, ...vp };
            })
            setService([...service, [e.target.name, name]]);
        } else {
            setVendorPrice(vp => {
                delete vp[res._id];
                return { ...vp };
            })
            setQuantity(q => {
                delete q[res._id];
                return { ...q };
            })
            setService(service.filter(s => (s[0] != e.target.name)));
        }
    }

    const createCustomService = () => {
        setCustomService(csList => {
            const newService = {
                id: csId,
                name: '',
                vendorprice: '',
                quantity: '',
                unit: ''
            }
            return [...csList, newService];
        })
    };

    const handleCustomService = (e) => {
        setCustomService(csList => {
            let id;
            const newList = [...csList];

            csList.forEach((cs, index) => {
                if (cs.id == e.target.getAttribute('data-id')) {
                    id = index
                }
            });

            newList[id][e.target.name] = e.target.value;

            return [...newList];
        });
    }

    const deleteCustomService = (e) => {
        setCustomService(csList => {
            let id;
            let newList = [...csList];

            csList.forEach((cs, index) => {
                if (cs.id == e.target.getAttribute('data-id')) {
                    id = index
                }
            });

            newList = newList.filter((cs, index) => index != id);

            return [...newList];
        })
    }

    const show = (i) => {
        if (filter) {
            const { _id, productName } = result[i];
            const val = [_id, productName].map(item => item.toLowerCase().includes(filter.toLowerCase()));
            return !val.includes(true) ? 'hide' : '';
        }
        return '';
    };

    if (popup) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <button
                type="button"
                className="popup-btn service-btn"
                onClick={handlePopup}
            >
                {
                    service.length > 0 ?
                        'Edit Services' :
                        'Add Services'
                }
            </button>
            {
                popup &&
                (<div className="popup-container">
                    <div className="popup-select">
                        <div className="popup-header">
                            <h2>Add Services To Job</h2>
                            <Search
                                placeholder="Service Search"
                                allowClear
                                onSearch={handleSearch}
                                style={{
                                    width: 300,
                                    marginRight: 30
                                }}
                            />
                            <button
                                type="button"
                                className="popup-btn"
                                style={{
                                    "position": "relative",
                                    "right": "-50px",
                                    "color": "white",
                                    "background": "#cccccc",
                                    "transform": "translate(-100%, 0)"
                                }}
                                onClick={handlePopup}
                            >Close</button>
                        </div>
                        <div className="service-container">
                            <div className="service-header">
                                <h3>Service</h3>
                                <h3>Price</h3>
                                <h3>Quantity</h3>
                                <h3>Unit</h3>
                                <h3>Budget</h3>
                                <h3>Select</h3>
                            </div>
                            <div className="services-wrapper">
                                {
                                    result && result.map((res, index) => (res.client == client) && (
                                        <div
                                            className={`service-wrapper ${show(index)}`}
                                            key={res._id}
                                        >
                                            <div>
                                                <p className="tooltip">
                                                    {res.productName}
                                                </p>
                                                <span>{res.description}</span>
                                            </div>
                                            <div>
                                                {res.vendorPrice}
                                            </div>
                                            <div>
                                                <Input
                                                    type="number"
                                                    name={res._id}
                                                    onChange={handleQuantity}
                                                    value={quantity[res._id]}
                                                    disabled={!checked(res)}
                                                />
                                            </div>
                                            <div>
                                                {res.unit}
                                            </div>
                                            <div>
                                                {quantity[res._id] ? quantity[res._id] * res.vendorPrice : 0}
                                            </div>
                                            <div>
                                                <Checkbox
                                                    name={res._id}
                                                    onChange={handleCheck}
                                                    checked={checked(res)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                sBudget > 0 && (
                                    <div className="service-footer">
                                        <h3>Service Total Budget</h3>
                                        <h3>{sBudget}</h3>
                                    </div>
                                )
                            }

                        </div>
                        {/* Add Custom Services */}
                        <div className="cs-container">
                            <button
                                type="button"
                                className="cs-button popup-btn service-btn"
                                onClick={createCustomService}
                            >Add Custom Services</button>
                            {(customService.length > 0) && (
                                <>
                                    <div className="cs-header">
                                        <h3>Name</h3>
                                        <h3>Vendor Price</h3>
                                        <h3>Quantity</h3>
                                        <h3>Unit</h3>
                                        <h3>Budget</h3>
                                    </div>
                                    <div className="cs-list">
                                        {customService.map((cs) => (
                                            <div className="cs-wrapper" data-id={cs.id} key={cs.id}>
                                                <Input type="string" name="name" data-id={cs.id} onChange={handleCustomService} value={cs.name} />
                                                <Input type="number" name="vendorprice" data-id={cs.id} onChange={handleCustomService} value={cs.vendorprice} />
                                                <Input type="number" name="quantity" data-id={cs.id} onChange={handleCustomService} value={cs.quantity} />
                                                <select
                                                    style={{
                                                        borderWidth: 1,
                                                        borderColor: 'lightgrey',
                                                        height: 34,
                                                    }}
                                                    name="unit"
                                                    data-id={cs.id}
                                                    onChange={handleCustomService}
                                                    value={cs.unit}
                                                >
                                                    <option selected>---Select---</option>
                                                    <option value="Runningfeet">Running Feet</option>
                                                    <option value="Runningmeter">Running Meter</option>
                                                    <option value="squarefeet">Square Feet</option>
                                                    <option value="squaremeter">Square Meter</option>
                                                    <option value="kilogram">Kilogram</option>
                                                    <option value="nos">Nos</option>
                                                    <option value="lumsum">Lumsum</option>
                                                </select>
                                                <Input name="budget" value={cs.vendorprice * cs.quantity} />
                                                <button
                                                    type="button"
                                                    className="popup-btn"
                                                    style={{
                                                        "position": "relative",
                                                        "color": "white",
                                                        "background": "#cccccc",
                                                    }}
                                                    data-id={cs.id}
                                                    onClick={deleteCustomService}
                                                >X</button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            {
                                (csBudget > 0) &&
                                (
                                    <div className="cs-footer">
                                        <h3>Custom Service Total Budget</h3>
                                        <h3>{csBudget}</h3>
                                    </div>
                                )
                            }
                        </div>
                        <div className="popup-footer">
                            <h3>Total Budget</h3>
                            <h3>{budget}</h3>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

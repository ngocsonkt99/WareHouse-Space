import React, { Fragment } from 'react';
import { Carousel } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';

export default function HotIndustry(props) {
    const history = useHistory();
    var dataSearch = props.dataSearch;
    return (
        <Fragment>
            <div className="row" style={{ marginTop: 20 }}>
                <div style={{ width: '100%' }}>
                    <h1 style={{ textAlign: "center" }}>Tìm Kiếm Hot</h1>

                    <Carousel indicators={false} interval={2000} controls={false}>
                        <Carousel.Item>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <center>
                                        {
                                            dataSearch.map((item, i) => {
                                                if (i < 4) {

                                                    return <Link key={i} to='/' onClick={(e) => {
                                                        e.preventDefault();
                                                        history.push('/timkiem?data=' + item.ten + '&order=newest');
                                                    }}>
                                                        <div className='post' style={{ width: 200, height: 200, marginLeft: 20, backgroundColor: '#99CCFF', display: 'inline-block', borderRadius: 10, textAlign: 'center', padding: 20 }}>
                                                            <h5 style={{ marginTop: '35%', color: 'white' }}>{item.ten}</h5>
                                                        </div>
                                                    </Link>

                                                }
                                            })
                                        }
                                    </center>

                                </div>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <center>
                                        {
                                            dataSearch.map((item, i) => {
                                                if (i < 8 && i > 3) {

                                                    return <Link key={i} to='/' onClick={(e) => {
                                                        e.preventDefault();
                                                        history.push('/timkiem?data=' + item.ten + '&order=newest');
                                                    }}>
                                                        <div className='post' style={{ width: 200, height: 200, marginLeft: 20, backgroundColor: '#99CCFF', display: 'inline-block', borderRadius: 10, textAlign: 'center', padding: 20 }}>
                                                            <h5 style={{ marginTop: '35%', color: 'white' }}>{item.ten}</h5>
                                                        </div>
                                                    </Link>

                                                }
                                            })
                                        }
                                    </center>

                                </div>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <center>
                                        {
                                            dataSearch.map((item, i) => {
                                                if (i < 12 && i > 7) {

                                                    return <Link key={i} to='/' onClick={(e) => {
                                                        e.preventDefault();
                                                        history.push('/timkiem?data=' + item.ten + '&order=newest');
                                                    }}>
                                                        <div className='post' style={{ width: 200, height: 200, marginLeft: 20, backgroundColor: '#99CCFF', display: 'inline-block', borderRadius: 10, textAlign: 'center', padding: 20 }}>
                                                            <h5 style={{ marginTop: '35%', color: 'white' }}>{item.ten}</h5>
                                                        </div>
                                                    </Link>

                                                }
                                            })
                                        }
                                    </center>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </Fragment>
    )
}

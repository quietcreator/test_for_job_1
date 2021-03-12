import React from "react";

export default (props) => {
    const return_date = date => {
        const datee = new Date(date);
        const month = (datee.getMonth()<10 ? '0' : '') + (datee.getMonth()+1);
        const days = (datee.getDate()<10 ? '0' : '') + datee.getDate();
        // const hours = datee.getHours();
        // const min = (datee.getMinutes()<10 ? '0' : '') + datee.getMinutes();
        const str = `${days}.${month}`;
        return str;
    }

    return (
        <article>
            {
                props.finish_result.map((countries) => {
                    return (
                        countries.items.map((leagues_countries, index) => {
                            return (
                                <section key={index} id="section">
                                    <div className="head-cont">
                                        <img src={countries.league === 'Англия' ? "img/uk.svg" : "img/eu.svg"} alt="ukkkk"/>
                                        <h2>{countries.league+': '+leagues_countries.item}</h2>
                                    </div>
                                    {
                                        leagues_countries.detail.map((details, i) => {
                                            return(
                                                <div key={i} className="body-cont">
                                                    <div className="body-cont_1"><span className="body-cont_1--1">{return_date(details.time)}</span></div>
                                                    <div className="body-cont_2">
                                                        <h2 className="body-cont_2--1">{details.name}</h2>
                                                        <span className="body-cont_2--3">{details.score}</span>
                                                        <span className={details.favorite ? "fa fa-star checked body-cont_2--2" : "fa fa-star body-cont_2--2"}></span></div>
                                                    <div className="body-cont_3">{details.status}</div>
                                                    <div className="body-cont_4"><a href="{details.link}" className="body-cont_4--1">Подробнее</a></div>
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                            )
                        })
                    )
                })
            }
        </article>
    );
}
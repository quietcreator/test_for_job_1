import React, {useState, useEffect} from 'react';
import Header from './cont/Header';
import axios from 'axios';
import Content from './cont/Content';
import Sidebar from './cont/Sidebar';
import Contnav from './cont/Contnav';
import {Route, Redirect} from 'react-router-dom'
import {MyContext} from './context'



export default ({value = ""}) => {
    const [leaguesData, setLeaguesData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [text, setText] = useState(value);
    const useSetText = (xxx) => { setText(xxx); updateGetData(); }


    const result_result = (leagues, matchs) => {
        leagues.forEach(league => {
            league.items.forEach(item => {
                item.detail = [];
                matchs.forEach(match => {
                    if(item.id === match.league_id) {
                        item.detail.push(match);
                    }
                })
            })
        })
        const finish_leagues = [];
        leagues.forEach(league => {
            let arr = [];
            league.items.forEach(item => {
                if(item.detail.length !== 0) { 
                    arr.push(item)
                }
            })
            if(arr.length !== 0) {
                let res = {}
                res.id = league.id;
                res.league = league.league;
                res.items = arr;
                finish_leagues.push(res);
            }
        })

        return finish_leagues;
    }

    useEffect(() => {
        (async () => {
            const [firstResponse, secondResponse] = await Promise.all([
                axios.get('http://u0362146.plsk.regruhosting.ru/league'),
                axios.get('http://u0362146.plsk.regruhosting.ru/country')
            ]);
            const leaguesData = firstResponse.data;
            const countryData = secondResponse.data;

            const thirdResponse = await axios.get('http://u0362146.plsk.regruhosting.ru/match');
            const matchsData = thirdResponse.data;

            const finish_result = result_result(leaguesData, matchsData);

            setLeaguesData([...finish_result]);
            setCountryData([...countryData]);
        })()
    }, [])

    let qwertyuiop = (nnn=0, zzz=true) => {
        let urm1 = [];
        for(let league of leaguesData) {
            let urm2 = [];
            for(let item of league.items) {
                let result3;
                if(zzz) {
                    result3 = item.detail.filter(d => {
                        let dat = new Date(d.time);
                        let day = dat.getDate();
                        let tek_dat = new Date();
                        let tek_day = tek_dat.getDate();
                        return day === (tek_day + nnn);
                    })
                } else {
                    result3 = item.detail;
                }
                
                if(text !== '') {
                    result3 = result3.filter(f => {
                        return f.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
                    })
                }
                
                if(result3.length !== 0) {
                    let uro2 = {};
                    uro2.item = item.item;
                    uro2.detail = result3;
                    urm2.push(uro2);
                }
            }

            if(urm2.length !== 0) {
                let uro1 = {};
                uro1.league = league.league;
                uro1.items = urm2;
                urm1.push(uro1);
            }
        }
        return urm1;
    }

    let today, tomorrow;
    const updateGetData = () => {
        today = qwertyuiop();
        tomorrow = qwertyuiop(1);
    }
    updateGetData();

    const Today = function(props) {return (<Content {...props} finish_result={today} />);};
    const Tomorrow = function(props) {return (<Content {...props} finish_result={tomorrow} />);};
    const AllMatches = function(props) {return (<Content {...props} finish_result={text === '' ? leaguesData : qwertyuiop(0, false)} />);};
    

    let se = 0, za = 0, vse = 0;
    for(let league of leaguesData) {
        for(let item of league.items) {
            for(let i of item.detail) {
                vse++;
                let dat = new Date(i.time);
                let day = dat.getDate();
                let nowdat = new Date();
                let nowday = nowdat.getDate();
                if(day === nowday+1) {za++;}
                if(day === nowday) {se++;}
            }
        }
    }
    
    return (
        <MyContext.Provider value={{
            useSetText, text
        }}>
            <div className="wrapper">
                <Header/>
                <main>
                    <Sidebar finish_result = {leaguesData} countryData = {countryData} />
                    <div style={{flex: 1}}>
                        <Contnav se={se} za={za} vse={vse} />
                        
                        <Route path="/today" exact component={Today} />
                        <Route path="/tomorrow" exact component={Tomorrow} />
                        <Route path="/all_matches" exact component={AllMatches} />
                        <Redirect to={'/today'} />
                    </div>
                </main>
            </div>
        </MyContext.Provider>
    );
}

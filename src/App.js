import React from 'react';
import './App.scss';
import dayjs from 'dayjs';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [],
            imgNames: [
                'USDJPY_5m.jpg',
                'USDJPY_1H.jpg',
                'GBPJPY_5m.jpg',
                'GBPJPY_1H.jpg',
                'EURJPY_5m.jpg',
                'EURJPY_1H.jpg',
                'GBPAUD_5m.jpg',
                'GBPAUD_1H.jpg',
                'EURAUD_5m.jpg',
                'EURAUD_1H.jpg',
                'EURGBP_5m.jpg',
                'EURGBP_1H.jpg',
                'GBPUSD_5m.jpg',
                'GBPUSD_1H.jpg',
                'EURUSD_5m.jpg',
                'EURUSD_1H.jpg'
            ]
        };
    }

    componentDidMount() {
        this.getImgs();
        setInterval(() => {
            this.getImgs();
        }, 60000);
    }

    getImgs = () => {
        const folder = require.context('../public/img', false, /.*\.jpg$/);
        let imgs = [];
        folder.keys().forEach((key) => {
            imgs.push(key);
        });
        imgs.sort((a, b) => {
            if (a.indexOf('_5m') !== -1) {
                return -1;
            }
            return 0;
        });
        this.setState({ imgs });
    };

    renderImgs() {
        const { imgs = [], imgNames } = this.state;
        if (imgNames.length > 0) {
            let img = [];
            img = imgNames.map((url) => {
                let dateformat = dayjs().format('YYYY MM-DDTHH:mm:ss');
                console.log('dateformat:', dateformat);
                return (
                    <div key={url} className="wrapper">
                        <h3>{`${url}-${dateformat}`}</h3>
                        <img src={`/img/${url}?${new Date() / 1}`} alt={url} />
                    </div>
                );
            });

            return <div className="img-container">{img}</div>;
        }
        return null;
    }
    render() {
        return (
            <div className="App">
                <h1>邱子威</h1>
                {this.renderImgs()}
            </div>
        );
    }
}

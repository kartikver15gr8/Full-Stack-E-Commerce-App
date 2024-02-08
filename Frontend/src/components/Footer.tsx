
export default function Footer() {
    return (
        <div className="footer">
            <div className="backToTop" style={{ display: 'flex', backgroundColor: 'rgb(72, 87, 105)', width: '100%', height: '45px' }}>
                <h4 style={{ color: 'whitesmoke', fontFamily: 'monospace' }}>Back to top</h4>
            </div>

            <div className="box2" style={{ display: 'flex', backgroundColor: 'rgb(35, 47, 62)', width: '100%', height: '400px', justifyContent: 'center' }}>
                <div className="sec1" style={{ width: '200px', display: 'flex', flexDirection: 'row', marginTop: '45px', marginRight: '20px' }}>
                    <ul style={{ color: 'whitesmoke', fontFamily: 'monospace', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                        <h2>Get to Know Us</h2>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press Release</li>
                        <li>Amazon Science</li>
                    </ul>
                </div>


                <div className="sec2" style={{ width: '200px', display: 'flex', flexDirection: 'row', marginTop: '45px', marginRight: '20px' }}>
                    <ul style={{ color: 'whitesmoke', fontFamily: 'monospace', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                        <h2>Connect with Us</h2>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                    </ul>
                </div>
                <div className="sec3" style={{ width: '200px', display: 'flex', flexDirection: 'row', marginTop: '45px', marginRight: '20px' }}>
                    <ul style={{ color: 'whitesmoke', fontFamily: 'monospace', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                        <h2>Make Money with Us</h2>
                        <li>Advertise Your Products</li>
                        <li>Sell on Amazon</li>
                        <li>Fulfilment by Amazon</li>
                        <li>Become an Affiliate</li>
                        <li>Protect and Build Your Brand</li>
                        <li>Sell under Amazon Accelerator</li>
                    </ul>
                </div>
                <div className="sec4" style={{ width: '200px', display: 'flex', flexDirection: 'row', marginTop: '45px', marginRight: '20px' }}>
                    <ul style={{ color: 'whitesmoke', fontFamily: 'monospace', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                        <h2>Let Us Help You</h2>
                        <li>Your Account</li>
                        <li>Return Centre</li>
                        <li>Help</li>
                        <li>Covid-19 and Amazon</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="box3" style={{ display: 'flex', backgroundColor: 'rgb(35, 47, 62)', width: '100%', height: '200px', justifyContent: 'center' }}>

                <div className="one"></div>
                <div className="two"></div>
            </div>
        </div >
    )
};

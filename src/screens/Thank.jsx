import React from 'react'
import Lottie from 'react-lottie'
// import bear from '../assets/animations/bear2.json'
import thanks from '../assets/animations/thanks.json'
import chef from '../assets/animations/chef.json'


const Thank = (props) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg flex justify-center">
                <div style={{ width: '50%', height: '100%' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Lottie options={
                            {
                                loop: true,
                                autoplay: true,
                                animationData: thanks,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }
                        }
                            isClickToPauseDisabled={false}
                            width={'100%'} />
                    </div>

                    <Lottie options={
                        {
                            loop: true,
                            autoplay: true,
                            animationData: chef,
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            }
                        }
                    }
                        isClickToPauseDisabled={false}
                        width={'100%'} />
                </div>
            </div>
        </div>

    )
}

export default Thank
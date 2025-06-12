import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="w-full p-2 overflow-x-hidden">
            <footer className="p-5 rounded-2xl md:px-10 lg:px-16 w-full text-gray-900 bg-gray-100 dark:bg-gray-600 dark:text-gray-100">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-800 pb-10">
                    {/* Left Section */}
                    <div className="md:max-w-md">
                        <img
                            className="w-36 h-auto"
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg"
                            alt="logo"
                        />
                        <p className="mt-6 text-sm text-gray-800 dark:text-gray-200">
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
                                alt="google play"
                                className="h-10 w-auto border border-white rounded"
                            />
                            <img
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
                                alt="app store"
                                className="h-10 w-auto border border-white rounded"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex-1 flex flex-col sm:flex-row md:justify-end gap-10 md:gap-20">
                        <div className='flex flex-row'>
                          <div>
                            <h2 className="font-semibold mb-5">Company</h2>
                            <ul className="text-sm flex-col items-center justify-center space-y-2">
                                <li><Link to="#">Home</Link></li>
                                <li><Link to="#">About us</Link></li>
                                <li><Link to="#">Contact us</Link></li>
                                <li><Link to="#">Privacy policy</Link></li>
                            </ul>
                        </div>
                        <div>
                          <h2 className="font-semibold mb-5">Get in touch</h2>
                            <div className="text-sm space-y-2">
                                <p>+1-234-567-890</p>
                                <p>contact@example.com</p>
                            </div>
                        </div>
                        </div>

                        <div>
                            

                            <div className='pt-5'>
                                <p className='text-lg text-gray-600 dark:text-gray-300'>STAY UPDATED</p>
                                <p className='mt-3 text-sm'>
                                    Subscribe to our newsletter for inspiration and special offers.
                                </p>
                                <div className='flex items-center mt-4 max-w-full sm:max-w-xs'>
                                    <input
                                        type="text"
                                        className='flex-grow bg-gray-200 rounded-l border border-gray-300 h-9 px-3 outline-none'
                                        placeholder='Your email'
                                    />
                                    <button className='bg-black h-9 w-9 rounded-r flex items-center justify-center'>
                                        <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="pt-4 text-center text-sm pb-5">
                    © {new Date().getFullYear()} Appointment. All Rights Reserved.
                </p>
            </footer>
        </div>
    )
}

export default Footer

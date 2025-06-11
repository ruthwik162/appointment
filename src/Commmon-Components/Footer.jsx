import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className=' w-full  '>
            <footer className=" border-4 p-5  rounded-2xl md:px-50 lg:px-25 w-full text-gray-900 bg-gray-100 dark:bg-gray-600 dark:text-gray-100">
                <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-800 pb-10">
                    <div className="md:max-w-96">
                        <img className="w-36 invert-10 h-auto" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoWhite.svg" alt="logo" />
                        <p className="mt-6 text-sm text-grey-800">
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div className="flex items-center gap-2 mt-4">
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="google play" className="h-10 w-auto border border-white rounded" />
                            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="app store" className="h-10 w-auto border border-white rounded" />
                        </div>
                    </div>
                    <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                        <div>
                            <h2 className="font-semibold mb-5">Company</h2>
                            <ul className="text-sm space-y-2">
                                <li><Link href="#">Home</Link></li>
                                <li><Link href="#">About us</Link></li>
                                <li><Link href="#">Contact us</Link></li>
                                <li><Link href="#">Privacy policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="font-semibold items-end justify-center mb-5">Get in touch</h2>
                            <div className="text-sm space-y-2">
                                <p>+1-234-567-890</p>
                                <p>contact@example.com</p>
                            </div>
                            <div className='pt-5'>
                                <p className='text-lg text-gray-300'>STAY UPDATED</p>
                            <p className='mt-3 text-sm'>
                                Subscribe to our newsletter for inspiration and special offers.
                            </p>
                            <div className='flex items-center mt-4'>
                                <input type="text"  className='bg-grey-200 rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                                <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                                    {/* Arrow icon */}
                                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns={assets.black_arrow_icon} width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                                </button>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
                <p className="pt-4 text-center text-sm pb-5">
                    Copyright {new Date().getFullYear()} © Appointment.  All Right Reserved.
                </p>
            </footer>

        </div>
    )
}

export default Footer

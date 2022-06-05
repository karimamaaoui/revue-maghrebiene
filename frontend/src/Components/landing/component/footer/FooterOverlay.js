import React from 'react';

import './FooterOverlay.css';

export default function FooterOverlay() {
    return (
        <div>

            <footer class="footer_area " style={{ backgroundColor: 'white' }}>
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-lg-4">
                            <div class="single-footer-widget section_padding_0_130">
                                <div class="footer-logo mb-3"></div>
                                <p>Appland is completely creative, lightweight, clean app landing page.</p>
                                <div class="footer_social_area"><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i class="fa fa-facebook"></i></a><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i class="fa fa-pinterest"></i></a><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype"><i class="fa fa-skype"></i></a><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg">
                            <div class="single-footer-widget section_padding_0_130">
                                <h5 class="widget-title">About</h5>
                                <div class="footer_menu">
                                    <ul>
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">Corporate Sale</a></li>
                                        <li><a href="#">Terms &amp; Policy</a></li>
                                        <li><a href="#">Community</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg">
                            <div class="single-footer-widget section_padding_0_130">
                                <h5 class="widget-title">Support</h5>
                                <div class="footer_menu">
                                    <ul>
                                        <li><a href="#">Help</a></li>
                                        <li><a href="#">Support</a></li>
                                        <li><a href="#">Privacy Policy</a></li>
                                        <li><a href="#">Term &amp; Conditions</a></li>
                                        <li><a href="#">Help &amp; Support</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6 col-lg">
                            <div class="single-footer-widget section_padding_0_130">
                                <h5 class="widget-title">Contact</h5>
                                <div class="footer_menu">
                                    <form>
                                        <input
                                            type='email'
                                            name='email'
                                            className='form-control'
                                            placeholder='email'
                                            required
                                        />
                                        <p className='help-block text-danger'></p>

                                        <textarea
                                            name='message'
                                            id='message'
                                            className='form-control'
                                            rows='4'
                                            placeholder='Message'
                                            required
                                        ></textarea>
                                        <p className='help-block text-danger'></p>

                                        <div id='success'></div>
                                        <button type='submit' className='btn btn-danger' style={{borderRadius:'15px'}}>
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

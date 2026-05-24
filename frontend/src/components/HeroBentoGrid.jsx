import React from 'react';
import { Link } from 'react-router-dom';

const HeroBentoGrid = () => {
    return (
        <section className="bento-section pt-120 pb-120">
            <div className="container container-lg">
                <div className="text-center mb-60">
                    <h1 className="premium-gradient-text display-1 fw-bold mb-16">Future of E-Commerce.</h1>
                    <p className="text-gray-600 text-xl max-w-600 mx-auto">Experience the ultimate hackathon-winning shopping platform. Powered by Valkey. Designed for perfection.</p>
                </div>

                <div className="bento-grid">
                    {/* Item 1: Large Main Feature */}
                    <div className="bento-item bento-large group">
                        <div className="bento-content">
                            <span className="badge bg-main-two text-white px-16 py-8 rounded-pill mb-16 d-inline-block">New Arrival</span>
                            <h2 className="text-gray-900 mb-16">Premium Audio Experience</h2>
                            <p className="text-gray-600 mb-32">Immerse yourself in crystal clear sound with active noise cancellation.</p>
                            <Link to="/shop" className="btn-premium btn-premium-gradient d-inline-block">Shop Now</Link>
                        </div>
                        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" alt="Premium Headphones" className="bento-img" />
                    </div>

                    {/* Item 2: Medium Feature */}
                    <div className="bento-item bento-medium group">
                        <div className="bento-content">
                            <h3 className="text-gray-900 mb-8">Smart Wearables</h3>
                            <Link to="/shop" className="text-main-two fw-bold hover-text-main transition-1">Explore <i className="ph ph-arrow-right"></i></Link>
                        </div>
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" alt="Smartwatch" className="bento-img" />
                    </div>

                    {/* Item 3: Tall Feature */}
                    <div className="bento-item bento-tall group">
                        <div className="bento-content">
                            <h3 className="text-gray-900 mb-16">Limited Edition</h3>
                            <h4 className="premium-gradient-text mb-32">Sneaker Drop</h4>
                            <Link to="/shop" className="btn-premium btn-premium-glass d-inline-block w-100 text-center">View Collection</Link>
                        </div>
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" alt="Sneakers" className="bento-img bento-img-bottom" />
                    </div>

                    {/* Item 4: Small Feature 1 */}
                    <div className="bento-item bento-small group">
                        <div className="bento-content text-center w-100">
                            <i className="ph ph-lightning text-main text-4xl mb-8 d-block"></i>
                            <h5 className="text-gray-900">Flash Sales</h5>
                            <p className="text-gray-600 text-sm">Up to 70% Off</p>
                        </div>
                    </div>

                    {/* Item 5: Small Feature 2 */}
                    <div className="bento-item bento-small group">
                        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop" alt="Camera" className="bento-img" />
                        <div className="bento-overlay flex-center">
                            <Link to="/shop" className="btn-premium btn-premium-gradient">Photography</Link>
                        </div>
                    </div>

                    {/* Item 6: Wide Feature */}
                    <div className="bento-item bento-wide group">
                        <div className="bento-content row align-items-center w-100">
                            <div className="col-md-6">
                                <h3 className="text-gray-900 mb-16">Pro Creator Setup</h3>
                                <p className="text-gray-600">Everything you need to build your ultimate workspace.</p>
                            </div>
                            <div className="col-md-6 text-end d-none d-md-block">
                                <Link to="/shop" className="btn-premium btn-premium-glass">Build Yours</Link>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop" alt="Workspace" className="bento-img bento-img-right opacity-50" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroBentoGrid;

import React from "react";
import blog1 from '../../assets/images/bridal-lehenga-cover.jpeg';
import blog2 from '../../assets/images/avoiding-lose-fitting.webp';


function BlogLayout() {

    return (
        <>
            <section className="margintop" style={{ marginTop: '50px', backgroundColor: '#ffffff' }}>
                <section className="banner ">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="col-12 banner">
                                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 
                                     mobilebanner">
                                        <picture>
                                            <source media="(min-width: 768px)" srcset={blog1} />
                                            <source media="(max-width: 767px)" srcset={blog1} />
                                            <img alt="Style Guide for Bridesmaids" className="lazyloaded img-fluid" src={blog1} title="Banner" />
                                        </picture>
                                    </div>
                                </div>
                                <div className="col-12 mt-3 mb-3 textdiv">
                                    <div className="head">
                                        <h1 className="title-blog">10 Mistakes You're Making With Lehenga</h1>
                                    </div>
                                </div>
                                <section className="mb-4">
                                    <div className=" mb-4">
                                        <div className="col-12">
                                            <p>Lehengas have been an integral part of Indian traditional attire, transcending time and trends with their timeless elegance and charm. Whether it's a wedding, festival, or any special occasion, a beautifully adorned lehenga can effortlessly elevate your style quotient. However, despite their popularity, many individuals often fall prey to common mistakes when it comes to selecting and styling their lehengas. In this comprehensive guide, we'll delve into the top 10 mistakes you might be making with your lehenga and how to avoid them.
                                            </p>
                                            <p><b>Introduction to Lehenga</b></p>
                                            <p>The lehenga, a traditional Indian attire, comprises a long skirt paired with a blouse and a dupatta. It's a versatile garment that comes in various styles, fabrics, and embellishments, making it suitable for diverse occasions and preferences.</p>
                                            <p>
                                                <b>Choosing the Right Lehenga Fabric</b> The fabric of your lehenga plays a crucial role in its overall look and comfort. Selecting the appropriate fabric according to the occasion and climate is essential for ensuring both style and comfort.
                                            </p>
                                            <p><b>Silk</b> Silk lehengas exude opulence and are perfect for grand occasions like weddings. However, they might not be ideal for summer events due to their heavy texture.</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 mb-3 textdiv">
                                            <img src='https://www.catwalkyourself.com/wp-content/uploads/2020/01/lehenga-5.jpg' alt="" width='100%' />
                                        </div>
                                        <div className="col-md-8 mt- px-3 textdiv">
                                            <div className="head">
                                                <h5 className="title-blog">Considering Body Type and Lehenga Style</h5>
                                                <p>Choosing the right lehenga style that complements your body type is crucial for achieving a flattering silhouette. Understanding your body shape and selecting the appropriate lehenga style can enhance your overall look.

                                                </p>
                                                <p><b>A-line :</b> A-line lehengas are universally flattering and suitable for most body types. They feature a fitted waistline that gradually flares out, creating an illusion of height and slimmer waist.
                                                </p>
                                                <p><b>Mermaid
                                                    :</b>Mermaid lehengas are fitted till the knees and then flare out dramatically, resembling the shape of a mermaid's tail. They accentuate the curves and are ideal for hourglass figures.

                                                </p>
                                                <p><b>A-line :</b> A-line lehengas are universally flattering and suitable for most body types. They feature a fitted waistline that gradually flares out, creating an illusion of height and slimmer waist.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" mb-4">
                                        <div className="col-12">
                                            <p><b>Incorporating Colors and Prints :-</b>Colour and print can instantly transform your outfit and uplift your mood. Don't shy away from bold hues or playful patterns. Experiment with mixing and matching complementary colours for a vibrant look that stands out. Stripes, florals, and animal prints are all fair game when it comes to adding personality to your wardrobe.
                                            </p>
                                            <p><b>Straight-cut :-</b>Straight-cut lehengas have a consistent width from the waist to the hem, offering a streamlined look. They are suitable for petite frames and can add length to the silhouette.

                                            </p>
                                        </div>
                                    </div>
                                    <div className="row mb-4">

                                        <div className="col-md-8 mt-3 p-2 textdiv">
                                            <div className="head">
                                                <h5 className="title-blog">Avoiding Ill-fitting Lehengas</h5>
                                                <p>One of the most common mistakes individuals make is purchasing ill-fitting lehengas without considering proper measurements. Ill-fitting lehengas not only compromise comfort but also detract from the overall elegance of the attire.
                                                </p>
                                                <p><b>Ignoring Lehenga Blouse Design :-
                                                </b>The blouse design is as important as the lehenga itself, as it complements the overall look and adds an element of style. Ignoring the blouse design or opting for an ill-suited style can affect the aesthetics of the ensemble.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3 textdiv">
                                            <img src={blog2} alt="" width='100%' />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="col-12">
                                            <p><b>Neglecting Lehenga Dupatta Draping
                                                :-
                                            </b>The dupatta draping style can significantly impact the overall appearance of the lehenga. Neglecting to drape the dupatta properly or choosing an inappropriate style can diminish the charm of the outfit.

                                            </p>
                                            <p><b>Overlooking Lehenga Accessories
                                                :-</b>Accessories play a crucial role in enhancing the overall look of the lehenga. From jewelry to footwear and handbags, overlooking the importance of coordinating accessories can result in a disjointed ensemble.

                                            </p>
                                            <p><b>Disregarding Lehenga Maintenance

                                                :-</b>Proper maintenance and care are essential for preserving the beauty and longevity of your lehenga. Neglecting to follow proper storage and cleaning instructions can lead to premature wear and tear.


                                            </p>
                                            <p><b>Rushing the Lehenga Selection Process

                                                :-</b>Selecting the perfect lehenga requires time, patience, and attention to detail. Rushing the selection process or settling for the first option without exploring alternatives can lead to dissatisfaction and regret later on.

                                            </p>
                                            <p>In conclusion, avoiding these common mistakes can help you make the most out of your lehenga ensemble, ensuring that you look and feel your best on every occasion. By considering factors such as fabric, body type, fit, and styling, you can create a stunning look that reflects your personal style and elegance.
                                            </p>
                                        </div>
                                    </div>
                                </section>


                            </div>
                        </div>
                    </div>
                </section>
            </section >
        </>
    );
}

export default BlogLayout;

import React, { Component } from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import Navigation from '../common/navigation';
import IsEditorCheck from '../common/isEditorCheck';
import FrequentArticles from './mostfrequentarticles'
import FrequentCategory from './mostfrequentcategory'
import MostLikedArticles from "./mostlikedarticles";
import ReadByLocation from './readByLocation';
import ReadByTimeOfTheDay from './readByTimeOfTheDay';
import ReadByAgeGroup from './readByAgeGroup';

class Landing extends Component {

    render() {

        return (
            <div>
                <IsEditorCheck />
                {/* <!-- Card with information --> */}
                <div class="bg-white pl-5 pr-5 pb-5">
                    <Header />
                    <Navigation />

                    {/* <div className="row mt-5">
                        <div className="col-md-6">
                            <FrequentArticles/>
                        </div>
                        <div className="col-md-6">
                            <FrequentCategory />
                        </div>
                    </div> */}
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <MostLikedArticles />
                        </div>
                        <div className="col-md-6">
                            <ReadByLocation />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <ReadByTimeOfTheDay />
                        </div>
                        <div className="col-md-6">
                            <ReadByAgeGroup />
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;
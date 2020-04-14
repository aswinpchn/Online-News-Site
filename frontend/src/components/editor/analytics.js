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

                    <h1>ANALYTICS</h1>

                    {/*<FrequentArticles/>
                        <FrequentCategory />*/}
                    <MostLikedArticles />
                    <ReadByLocation />
                    <ReadByTimeOfTheDay />
                    <ReadByAgeGroup />

                    <Footer />
                </div>
            </div>
        )
    }
}
//export Landing Component
export default Landing;
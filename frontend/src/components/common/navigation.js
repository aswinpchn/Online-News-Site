import React, {Component} from 'react';

class Home extends Component {

    render(){
        
        return(
            <div class="row bg-dark text-center font-weight-bold">
                <div class="col-md-2 p-2"><a href="/all" class="text-white">All</a></div>
                <div class="col-md-2 p-2"><a href="/politics" class="text-white">Politics</a></div>
                <div class="col-md-2 p-2"><a href="/science" class="text-white">Science</a></div>
                <div class="col-md-2 p-2"><a href="/business" class="text-white">Business</a></div>
                <div class="col-md-2 p-2"><a href="/food" class="text-white">Food</a></div>
                <div class="col-md-2 p-2"><a href="/sports" class="text-white">Sports</a></div>
            </div>
        )
    }
}
//export Home Component
export default Home;
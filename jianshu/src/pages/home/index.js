import React, { Component } from 'react';
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import {actionCreators} from './store'
import {connect} from 'react-redux'
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style';

class Home extends Component {
  handleToTop(){
    window.scrollTo(0,0)
  }


  render() {
    const {showScroll}=this.props
    return (
        <HomeWrapper>
            <HomeLeft>
                <img className='banner-img' alt='' src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
                <Topic></Topic>
                <List></List>
            </HomeLeft>
            <HomeRight>
                <Recommend></Recommend>
                <Writer></Writer>
            </HomeRight>
            {showScroll ?  
                <BackTop onClick={this.handleToTop}>^</BackTop> 
                :null
            }
           
        </HomeWrapper>
    )
  }

  componentDidMount(){
    this.props.changeHomeData();
    this.bindEvents();
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.props.changeScrollTopShow)
  }

  bindEvents(){
      window.addEventListener('scroll',this.props.changeScrollTopShow)
  }
}

const mapStateToProps=(state)=>{
    return {
      showScroll:state.getIn(['home','showScroll']),
    }
}

const mapDispatchToProps = (dispatch)=>({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo())
    },

    changeScrollTopShow(e){
        if(document.documentElement.scrollTop>400){
            dispatch(actionCreators.toggleTopShow(true))
        }else{
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
})



export default connect(mapStateToProps,mapDispatchToProps)(Home);
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux'
import {actionCreators}  from './store'
import {actionCreators as loginActionCreators}  from '../../pages/login/store'
import {Link} from 'react-router-dom'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem
} from './style'


class Header extends Component {

  //创建热门搜索
  getListArea = ()=>{
    const {focused,mouseIn,list,page,totalPage,handleMouseEnter,handleMouseLeave,handleChangePage} = this.props;
    const newList = list.toJS();
    const pageList = [] ;

    if(newList.length){
      for(let i = (page - 1) * 10 ; i<page * 10 ; i++ ){
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        )
      }
    }
    
    if(focused || mouseIn){
      return (
        <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>
              热门搜索
              <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
                <i className="iconfont spin" ref={(icon)=>{this.spinIcon = icon}}>&#xe851;</i>换一批
              </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    }else{
      return null
    }
  }

  render() {
    const {focused ,handleInputFocus,handleInputBlur,list,login,logout} = this.props
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo/>
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载APP</NavItem>   
          {
            login ? 
            <NavItem className='right' onClick={logout}>退出</NavItem>
            :
            <Link to="/login"><NavItem className='right'>登录</NavItem></Link>
          }
          
          <NavItem className='right'>
            <i className="iconfont">&#xe636;</i>
          </NavItem>

          {/*--搜索--*/}
          <SearchWrapper>
            <CSSTransition
                in={focused}
                timeout={200}
                classNames="slide"
              >
                <NavSearch 
                    className={focused ? 'focused' :''}
                    onFocus={()=>{handleInputFocus(list)}}
                    onBlur={handleInputBlur}
                  
                ></NavSearch>
              </CSSTransition>
              <i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>&#xe614;</i>

              {/*热门搜索*/}
              {this.getListArea()}
          </SearchWrapper>
    

          {/*--区域按钮--*/}
          <Addition>
            <Link to='/write'>
              <Button className='writting'>
                <i className="iconfont">&#xe615;</i>写文章
              </Button>
            </Link>
            <Button className='reg'>注册</Button>
          </Addition>
        </Nav>
      </HeaderWrapper>
    )
  }

}


//规则 --store会映射到 组件的 Props上
const mapStateToProps =(state) =>{
	return {
    focused:state.getIn(['header','focused']),
    mouseIn:state.getIn(['header','mouseIn']),
    list:state.getIn(['header','list']),
    page:state.getIn(['header','page']),
    totalPage:state.getIn(['header','totalPage']),
    login:state.getIn(['login','login']),
	}
}

//store.dispatch方法，挂在到props上
const mapDispatchToProps = (dispatch)=>{
	return {

    handleInputFocus(list){
      if(list.size===0){
        dispatch(actionCreators.getList())
      }
      
      dispatch(actionCreators.searchFocus())
    },

    handleInputBlur(){
      
      const action = actionCreators.searchBlur()
      dispatch(action)
    },

    handleMouseEnter(){
      const action = actionCreators.mouseEnter()
      dispatch(action)
    },
    handleMouseLeave(){
      const action = actionCreators.mouseLeave()
      dispatch(action)
    },
    handleChangePage(page,totalPage,spin){
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
				originAngle = parseInt(originAngle, 10);
			}else {
				originAngle = 0;
			}
      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

      if(page<totalPage){
        const action = actionCreators.changePage(page+1)
        dispatch(action)
      }else{
        const action = actionCreators.changePage(1)
        dispatch(action)
      }

      
      
    },

    logout(){
      const action = loginActionCreators.logout()
      dispatch(action)
    }
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);

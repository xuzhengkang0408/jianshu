import React, { Component } from 'react';
import {connect} from 'react-redux'
import {actionCreators} from '../store'
import {Link} from 'react-router-dom'
import { 
  ListItem, 
  ListInfo, 
  LoadMore
} from '../style';
class List extends Component {

 
  render() {
    const {articleList,getMoreList,articlePage} = this.props
    return (
      <div>
        {
          articleList.map((item,index)=>{
            return (
              <Link key={index} to={'/detail/'+item.get('id')}>
                <ListItem >
                  <img className="pic" src={item.get('imgUrl')} />
                  <ListInfo>
                    <h3 className="title">{item.get('title')}</h3>
                    <p className="desc">{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            )
          })
        }

        <LoadMore onClick={()=>getMoreList(articlePage)}>查看更多</LoadMore>
       
      
      </div>
    )
  }
}


const mapStateToProps=(state)=>{
  return {
    articleList:state.getIn(['home','articleList']),
    articlePage:state.getIn(['home','articlePage']),
  }
}

const mapDispatchToProps = (dispatch)=>({
  getMoreList(articlePage){
    dispatch(actionCreators.getMoreList(articlePage))
  }
})




export default connect(mapStateToProps,mapDispatchToProps)(List);

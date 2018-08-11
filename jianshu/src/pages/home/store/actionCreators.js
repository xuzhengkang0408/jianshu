
import * as constants from './constants'
import axios from 'axios'
import {fromJS} from 'immutable'

const changeHomeData = (result) =>({
    type:constants.CHANGE_HOME_DATA,
    topicList:fromJS(result.topicList),
    articleList:fromJS(result.articleList),
    recommendList:fromJS(result.recommendList)
})

const addArticleList = (result,nextPage) =>({
    type:constants.ADD_ARTICLE_LIST,
    articleList:fromJS(result),
    nextPage
})

export const getHomeInfo =()=>{
    return (dispatch)=>{
        axios.get('/api/home.json').then((res)=>{
            const result = res.data.data
            dispatch(changeHomeData(result))
        })
    }
}

export const getMoreList =(articlePage)=>{
    return (dispatch) =>{
        axios.get('/api/homeList.json?page='+articlePage).then((res)=>{
            const result = res.data.data
            dispatch(addArticleList(result,articlePage+1))
        })
    }
}

export const toggleTopShow =(show)=>({
    type:constants.TOGGLE_TOP_SHOW,
    show    
})




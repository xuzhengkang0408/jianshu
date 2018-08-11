import * as constants from './constants'
import {fromJS} from 'immutable'

const defaultState = fromJS({
    topicList:[],
	articleList:[],
	recommendList:[],
	articlePage:1,
	showScroll:false

})

export default (state=defaultState,action)=>{

    switch(action.type){
		case constants.CHANGE_HOME_DATA:
			return state.merge({
				topicList:action.topicList,
				articleList:action.articleList,
				recommendList:action.recommendList,
			})
		case constants.ADD_ARTICLE_LIST:
			return state.merge({
				articleList:state.get('articleList').concat(action.articleList),
				articlePage:action.nextPage,
			})
		case constants.TOGGLE_TOP_SHOW:
			return state.set('showScroll',action.show)
        default:
            return state
    }
    

   

}
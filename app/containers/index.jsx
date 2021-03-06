import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Localstore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFormOtherFile from '../actions/userinfo'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone
                    ? this.props.children
                    : <div>加载中</div>
                }
            </div>
        )
    }
    componentDidMount() {
        // 从localstorage里面获取城市
        let cityName = Localstore.getItem(CITYNAME);
        if (cityName == null){
            cityName = '上海'
        }
        
        //存入redux
        this.props.userInfoActions.update({
            cityName: cityName
        })

        this.setState({
            initDone: true
        })
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFormOtherFile, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

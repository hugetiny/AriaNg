import {Component} from 'react'

class Status extends Component {
    render() {
        return <div>
            <section className="content no-padding">
                <div className="settings-table striped hoverable">
                    <div className="row">
                        <div className="setting-key col-sm-4">
                            <span translate>Aria2 RPC Address</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{context.host}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key col-sm-4">
                            <span translate>Aria2 Status</span>
                        </div>
                        <div className="setting-value col-sm-8">
                <span
                    className={"label ${'label-primary': context.status === 'Connecting', 'label-success': context.status === 'Connected', 'label-danger': context.status === 'Disconnected'}"}
                >{context.status}</span>
                        </div>
                    </div>
                    if(context.serverStatus){
                    <div className="row ng-cloak">
                        <div className="setting-key col-sm-4">
                            <span translate>Aria2 Version</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{context.serverStatus.version}</span>
                        </div>
                    </div>
                }
                    if(context.serverStatus){
                    <div className="row ng-cloak">
                        <div className="setting-key col-sm-4">
                            <span translate>Enabled Features</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <div className="checkbox checkbox-primary checkbox-compact default-cursor"
                                 ng-repeat="feature in context.serverStatus.enabledFeatures">
                                <input id="{{'feature_' + $index}}" type="checkbox" checked="checked"
                                       disabled="disabled"
                                       className="default-cursor"/>
                                <label for="{{'feature_' + $index}}" className="text-cursor">
                                    <span>{feature}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                }
                    if(context.serverStatus){
                    <div className="row ng-cloak" ng-if="context.serverStatus">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Functions</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <button className="btn btn-sm btn-primary" onClick={saveSession()} promise-btn>
                                <span translate>Save Session</span>
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={shutdown()}>
                                <span translate>Shutdown Aria2</span>
                            </button>
                        </div>
                    </div>
                }
                </div>
            </section>
        </div>
    }
}

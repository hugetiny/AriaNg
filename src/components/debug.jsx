import {Component} from 'react'

class Debug extends Component {

    render() {
        return <div>
            <section className="content no-padding ng-cloak" ng-if="enableDebugMode()">
                <div className="nav-tabs-custom">
                    <ul className="nav nav-tabs">
                        <li className="active">
                            <a className="pointer-cursor">
                                {('format.debug.latest-logs' | translate: {count: logMaxCount})} Latest Logs
                            </a>
                        </li>
                        <li className="slim">
                            <a className="pointer-cursor" onClick={reloadLogs()}>
                                <i className="fa fa-refresh"/>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content no-padding">
                        <div className="settings-table striped hoverable">
                            <div className="row" ng-repeat="log in logs | reverse">
                                <div className="col-sm-12">
                                    <span className="label label-default">{'#' + ($index + 1)}</span>
                                    <span>{log.time | longDate}</span>
                                    <span
                                        className={"label ${'DEBUG':'label-default', 'INFO':'label-primary', 'WARN':'label-warning', 'ERROR':'label-danger'}[log.level]"}>{log.level}</span>
                                    <span>{log.content}</span>
                                    <a className="pointer-cursor" onClick={showLogDetail(log)} ng-if="log.attachment">
                                        <i className="fa fa-file-o"/> <span translate>Show Detail</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="log-detail-modal" className="modal fade" tabindex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" translate>Log Detail</h4>
                            </div>
                            <div className="modal-body no-padding">
                                <div className="settings-table striped">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <span>{currentLog.time | longDate}</span>
                                            <span
                                                className={"label ${'DEBUG':'label-default', 'INFO':'label-primary', 'WARN':'label-warning', 'ERROR':'label-danger'}[currentLog.level]"}>{currentLog.level}</span>
                                            <span>{currentLog.content}</span>
                                        </div>
                                    </div>
                                    <div className="row" ng-if="currentLog.attachment">
                                        <div className="col-sm-12">
                                            <pre>{currentLog.attachment | json}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    }
}

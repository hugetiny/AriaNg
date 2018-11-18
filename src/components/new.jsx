import { Component } from 'react'
class New extends Component {
    render() {
        return <div>

<section className="content no-padding">
    <form name="newTaskForm" ng-submit="startDownload()" novalidate>
        <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
                <li className={'active': context.currentTab === 'links'}>
                    <a className="pointer-cursor" onClick={changeTab('links')}>{(context.taskType === 'torrent' ? 'Torrent File' : (context.taskType === 'metalink' ? 'Metalink File' : 'Links') | translate)}Links</a>
                </li>
                <li className={'active': context.currentTab === 'options'}>
                    <a className="pointer-cursor" onClick={changeTab('options')} translate>Options</a>
                </li>
                <li className="divider"/>
                <li className="nav-toolbar">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-folder-open-o fa-1_1x"/>
                        </button>
                        <ul className="dropdown-menu right-align">
                            <li><a className="pointer-cursor" onClick={openTorrent()} translate>Open Torrent File</a></li>
                            <li><a className="pointer-cursor" onClick={openMetalink()} translate>Open Metalink File</a></li>
                        </ul>
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-sm"
                                className={"${!context.uploadFile && newTaskForm.$invalid?'btn-default'} ${context.uploadFile || !newTaskForm.$invalid?'btn-success'}"}
                                ng-disabled={!context.uploadFile && newTaskForm.$invalid} translate>Start Download
                        </button>&nbsp;
                        <button type="button" className="btn btn-sm dropdown-toggle"
                                className={"${!context.uploadFile && newTaskForm.$invalid?'btn-default'} ${context.uploadFile || !newTaskForm.$invalid?'btn-success'}"}
                                ng-disabled={!context.uploadFile && newTaskForm.$invalid} data-toggle="dropdown">
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu right-align">
                            <li><a className="pointer-cursor" onClick={startDownload(true)} translate>Download Later</a></li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div className="tab-content no-padding">
                <div className={"tab-pane ${'active': context.currentTab === 'links'}"}>
                    <div className="new-task-table" ng-if="context.taskType === 'urls'">
                        <div className="row">
                            <div className="col-sm-12">
                                <p>{'format.task.new.download-links' | translate: {count: getValidUrlsCount()}}Download Links:</p>
                                <div className={"form-group has-feedback no-margin ${ 'has-error' : newTaskForm.urls.$invalid && newTaskForm.urls.$dirty, 'has-success' : newTaskForm.urls.$valid && newTaskForm.urls.$dirty }"}>
                                    <textarea name="urls" className="form-control" rows="10" autofocus="autofocus" ng-auto-focus ng-valid-urls
                                              ng-model="context.urls" ng-required="true" ng-keydown="urlTextboxKeyDown($event)"
                                              placeholder="'Support multiple URLs, one URL per line.' | translate"></textarea>
                                    <div className="form-control-icon" ng-if="newTaskForm.urls.$dirty">
                                        <i className={"fa form-control-feedback ${'fa-check':newTaskForm.urls.$valid, 'fa-times':newTaskForm.urls.$invalid}"}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="new-task-table" ng-if="context.taskType === 'torrent' || context.taskType === 'metalink'">
                        <div className="row">
                            <div className="col-sm-12">
                                <p translate>File Name:</p>
                                <input className="form-control" ng-value="context.uploadFile ? context.uploadFile.fileName : ''" readonly="readonly"/>
                            </div>
                        </div>
                    </div>
                    <input id="file-holder" type="file" style="display: none"/>
                </div>
                <div className={"tab-pane ${'active': context.currentTab === 'options'}"}>
                    <div className="settings-table striped hoverable">
                        <div className="settings-table-title new-task-filter-title">
                            <div className="row">
                                <div className="col-sm-12">
                                    <span translate>Filters</span><span>:&nbsp;</span>
                                    <div className="checkbox checkbox-inline checkbox-primary">
                                        <input id="optionFilterGlobal" type="checkbox" ng-model="context.optionFilter['global']"/>
                                        <label for="optionFilterGlobal" translate>Global</label>
                                    </div>
                                    <div className="checkbox checkbox-inline checkbox-primary">
                                        <input id="optionFilterHttp" type="checkbox" ng-model="context.optionFilter['http']"/>
                                        <label for="optionFilterHttp" translate>Http</label>
                                    </div>
                                    <div className="checkbox checkbox-inline checkbox-primary">
                                        <input id="optionFilterBittorrent" type="checkbox" ng-model="context.optionFilter['bittorrent']"/>
                                        <label for="optionFilterBittorrent" translate>BitTorrent</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ng-setting ng-repeat="option in context.availableOptions" ng-if="context.optionFilter[option.category]"
                                    option="option" lazy-save-timeout="0" default-value="context.globalOptions[option.key]"
                                    on-change-value="setOption(key, value, optionStatus)"></ng-setting>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>
        </div>    }}

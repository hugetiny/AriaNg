import { Component } from 'react'
class SettingsAriang extends Component {
    render() {
        return <div>
<section className="content no-padding">
    <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
            <li className={'active': isCurrentGlobalTab()}>
                <a className="pointer-cursor" onClick={changeGlobalTab()} translate>Global</a>
            </li>
            <li className={"nav-tab-title-rpcname" ng-repeat="setting in context.rpcSettings ${'active': isCurrentRpcTab($index)}"}>
                <a className="pointer-cursor" onClick={changeRpcTab($index)}>
                    <span className="nav-tab-rpcname">{'RPC' + (setting.rpcAlias || setting.rpcHost ? ' (' + (setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort) + ')' : '')"data-toggle="tooltip" title="{{(setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort)}}}RPC</span>
                </a>
                <a className="pointer-cursor nav-tab-close" ng-if="!setting.isDefault"data-toggle="tooltip" title="{{'Delete RPC Setting' | translate}}">
                    <i className="fa fa-times" onClick={removeRpcSetting(setting)}></i>
                </a>
            </li>
            <li className="slim">
                <a className="pointer-cursor" onClick={addNewRpcSetting()}data-toggle="tooltip" title="{{'Add New RPC Setting' | translate}}">
                    <i className="fa fa-plus"></i>
                </a>
            </li>
        </ul>
        <div className="tab-content no-padding">
            <div className={"tab-pane ${'active': isCurrentGlobalTab()}"}>
                <div className="settings-table striped hoverable">
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Language</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;" ng-model="context.settings.language"
                                    ng-options="type as language.displayName for (type, language) in context.languages"
                                    ng-change="setLanguage(context.settings.language)">
                            </select>
                        </div>
                    </div>
                    <div className="row" ng-if="context.showDebugMode">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Debug Mode</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;" ng-model="context.sessionSettings.debugMode"
                                    ng-options="option.value as (option.name | translate) for option in context.trueFalseOptions"
                                    ng-change="setDebugMode(context.sessionSettings.debugMode)">
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Page Title</span>
                            <i className="icon-primary fa fa-question-circle" data-toggle="popover"
                               data-trigger="hover" data-placement="auto right" data-container="body" data-html="true"
                               data-content="{{('Supported Placeholder' | translate) + ':<br/>' +
                               ('AriaNg Title' | translate) + ': ${title}<br/>' +
                               ('Downloading Count' | translate) + ': ${downloading}<br/>' +
                                ('Waiting Count' | translate) + ': ${waiting}<br/>' +
                                ('Stopped Count' | translate) + ': ${stopped}<br/>' +
                                ('Download Speed' | translate) + ': ${downspeed}<br/>' +
                                ('Upload Speed' | translate) + ': ${upspeed}<br/><br/>' +
                                ('Tips: You can use the &quot;noprefix&quot; tag to ignore the prefix, &quot;nosuffix&quot; tag ignore the suffix, and &quot;scale=n&quot; tag to set the decimal precision.' | translate) + '<br/>' +
                                ('Example: ${downspeed:noprefix:nosuffix:scale=1}' | translate)}}"></i>
                        </div>
                        <div className="setting-value col-sm-8">
                            <input className="form-control" type="text" ng-model="context.settings.title"
                                   ng-change="setTitle(context.settings.title); updateTitlePreview()"/>
                            <em>[<span translate>Preview</span>] <span>{context.titlePreview}</span></em>
                        </div>
                    </div>
                    <div className="row" ng-if="isSupportNotification()">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Enable Browser Notification</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;"
                                    ng-model="context.settings.browserNotification"
                                    ng-change="setEnableBrowserNotification(context.settings.browserNotification)"
                                    ng-options="option.value as (option.name | translate) for option in context.trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Page Title Refresh Interval</span>
                            <span className="asterisk">*</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;"
                                    ng-model="context.settings.titleRefreshInterval"
                                    ng-change="setTitleRefreshInterval(context.settings.titleRefreshInterval)"
                                    ng-options="time.optionValue as (time.name | translate: {value: time.value}) for time in context.availableTime">
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Global Stat Refresh Interval</span>
                            <span className="asterisk">*</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;"
                                    ng-model="context.settings.globalStatRefreshInterval"
                                    ng-change="setGlobalStatRefreshInterval(context.settings.globalStatRefreshInterval)"
                                    ng-options="time.optionValue as (time.name | translate: {value: time.value}) for time in context.availableTime">
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Download Task Refresh Interval</span>
                            <span className="asterisk">*</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;"
                                    ng-model="context.settings.downloadTaskRefreshInterval"
                                    ng-change="setDownloadTaskRefreshInterval(context.settings.downloadTaskRefreshInterval)"
                                    ng-options="time.optionValue as (time.name | translate: {value: time.value}) for time in context.availableTime">
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>RPC List Display Order</span>
                            <span className="asterisk">*</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;" ng-model="context.settings.rpcListDisplayOrder"
                                    ng-change="setRPCListDisplayOrder(context.settings.rpcListDisplayOrder)">
                                <option value="recentlyUsed" translate>Recently Used</option>
                                <option value="rpcAlias" translate>RPC Alias</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Action After Creating New Tasks</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;" ng-model="context.settings.afterCreatingNewTask"
                                    ng-change="setAfterCreatingNewTask(context.settings.afterCreatingNewTask)">
                                <option value="task-list" translate>Navigate to Task List Page</option>
                                <option value="task-detail" translate>Navigate to Task Detail Page</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Removing Old Task After Restarting</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;" ng-model="context.settings.removeOldTaskAfterRestarting"
                                    ng-change="setRemoveOldTaskAfterRestarting(context.settings.removeOldTaskAfterRestarting)"
                                    ng-options="option.value as (option.name | translate) for option in context.trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Import / Export AriaNg Settings</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <button className="btn btn-sm btn-default" onClick={showImportSettingsModal()}>
                                <span translate>Import Settings</span>
                            </button>
                            <button className="btn btn-sm btn-default" onClick={showExportSettingsModal()}>
                                <span translate>Export Settings</span>
                            </button>
                        </div>
                    </div>
                    <div className="row tip no-background no-hover">
                        <span className="asterisk">*</span>
                        <span translate>Changes to the settings take effect after refreshing page.</span>
                        <button className="btn btn-xs btn-default" onClick={resetSettings()}>
                            <span translate>Reset Settings</span>
                        </button>
                        <button className="btn btn-xs btn-default" onClick={clearHistory()}>
                            <span translate>Clear Settings History</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"tab-pane" ng-repeat="setting in context.rpcSettings ${'active': isCurrentRpcTab($index)}"}>
                <div className="settings-table striped hoverable">
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Alias</span>
                            <span className="asterisk">*</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <input className="form-control" type="text" placeholder="(setting.rpcHost ? setting.rpcHost + ':' + setting.rpcPort : '')" ng-model="setting.rpcAlias" ng-change="updateRpcSetting(setting, 'rpcAlias')"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Address</span>
                            <span className="asterisk">*</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <div className="input-group input-group-multiple">
                                <span className="input-group-addon">{setting.protocol + '://'}</span>
                                <input className="form-control" type="text" ng-model="setting.rpcHost" ng-change="updateRpcSetting(setting, 'rpcHost')"/>
                                <span className="input-group-addon">:</span>
                                <div className="input-group-addon-container">
                                    <input className="form-control form-control-rpcport" type="text" ng-model="setting.rpcPort" ng-change="updateRpcSetting(setting, 'rpcPort')"/>
                                </div>
                                <span className="input-group-addon">/</span>
                                <div className="input-group-addon-container">
                                    <input className="form-control form-control-rpcinterface" type="text" ng-model="setting.rpcInterface" ng-change="updateRpcSetting(setting, 'rpcInterface')"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Protocol</span>
                            <span className="asterisk">*</span>
                            <i className="icon-primary fa fa-question-circle" ng-tooltip-container="body" ng-tooltip-placement="top"
                              data-toggle="tooltip" title="{{'Http and WebSocket would be disabled when accessing AriaNg via Https.' | translate}}"></i>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;" ng-model="setting.protocol" ng-change="updateRpcSetting(setting, 'protocol')">
                                <option value="http" ng-disabled="::(context.isInsecureProtocolDisabled)">{('Http' + (context.isInsecureProtocolDisabled ? ' (Disabled)' : '')) | translate}Http</option>
                                <option value="https" translate>Https</option>
                                <option value="ws" ng-disabled="::(context.isInsecureProtocolDisabled)">{('WebSocket' + (context.isInsecureProtocolDisabled ? ' (Disabled)' : '')) | translate}WebSocket</option>
                                <option value="wss" translate>WebSocket (Security)</option>
                            </select>
                        </div>
                    </div>
                    <div className="row" ng-if="setting.protocol === 'http' || setting.protocol === 'https'">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Http Request Method</span>
                            <span className="asterisk">*</span>
                            <i className="icon-primary fa fa-question-circle" ng-tooltip-container="body" ng-tooltip-placement="top"
                              data-toggle="tooltip" title="{{'POST method only supports aria2 v1.15.2 and above.' | translate}}"></i>
                        </div>
                        <div className="setting-value col-sm-8">
                            <select className="form-control" style="width: 100%;" ng-model="setting.httpMethod" ng-change="updateRpcSetting(setting, 'httpMethod')">
                                <option value="POST" translate>POST</option>
                                <option value="GET" translate>GET</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Secret Token</span>
                            <span className="asterisk">*</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <div className="input-group">
                                <input className="form-control" type="{{context.showRpcSecret ? 'text' : 'password'}}" ng-model="setting.secret" ng-change="updateRpcSetting(setting, 'secret')"/>
                                <span className="input-group-addon input-group-addon-compact no-vertical-padding">
                                    <button className="btn btn-xs btn-default"data-toggle="tooltip" title="{{context.showRpcSecret ? 'Hide Secret' : 'Show Secret' | translate}}"
                                            className={'active': context.showRpcSecret}" onClick={context.showRpcSecret = !context.showRpcSecret>
                                        <i className=}fa fa-eye"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row tip no-background no-hover">
                        <span className="asterisk">*</span>
                        <span translate>Changes to the settings take effect after refreshing page.</span>
                        <button className="btn btn-xs btn-default" ng-disabled="setting.isDefault" onClick={setDefaultRpcSetting(setting)}>
                            <span translate>Activate</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="import-settings-modal" className="modal fade" tabindex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">
                        <span translate>Import Settings</span>
                        <small>
                            <a className="pointer-cursor"data-toggle="tooltip" title="{{'Open' | translate}}" onClick={openAriaNgConfigFile()}>
                                <i className="icon-primary fa fa-folder-open-o"></i>
                            </a>
                        </small>
                    </h4>
                </div>
                <div className="modal-body no-padding">
                    <div className="settings-table striped">
                        <input id="import-file-holder" type="file" style="display: none"/>
                        <textarea className="form-control" ng-model="context.importSettings" rows="20"
                                  placeholder="'AriaNg settings data' | translate"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" ng-disabled="!context.importSettings || !context.importSettings.length"
                            onClick={importSettings(context.importSettings)} translate>Import</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal" translate>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div id="export-settings-modal" className="modal fade" tabindex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">
                        <span translate>Export Settings</span>
                        <small>
                            <a className="pointer-cursor"data-toggle="tooltip" title="{{'Save' | translate}}" ng-if="context.isSupportBlob"
                               ng-blob-download="context.exportSettings" ng-file-name="AriaNgConfig.json" ng-content-type="application/json">
                                <i className="icon-primary fa fa-save"></i>
                            </a>
                            <a className="pointer-cursor"data-toggle="tooltip" title="{{'Copy' | translate}}" onClick={copyExportSettings()}>
                                <i className="icon-primary fa fa-copy"></i>
                            </a>
                            <span className="label label-default fade-in" ng-if="context.exportSettingsCopied" translate>Data has been copied to clipboard.</span>
                        </small>
                    </h4>
                </div>
                <div className="modal-body no-padding">
                    <div className="settings-table striped">
                        <textarea className="form-control" ng-model="context.exportSettings" rows="20" readonly="readonly"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" translate>Cancel</button>
                </div>
            </div>
        </div>
    </div>
</section>
<script id="setting-changed-notification.html" type="text/ng-template">
    <div className="ui-notification custom-template">
        <div className="message" ng-bind-html="message"></div>
        <div className="message">
            <a className="btn btn-small btn-primary close-notification" onClick={refreshPage()} translate>Reload Page</a>
        </div>
    </div>
</script>
        </div>    }}



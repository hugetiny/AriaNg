import { Component } from 'react'
class TaskDetail extends Component {
    const options = context.availableOptions.map(option =>
        <div option="option"
             default-value="option.defaultValue"
             on-change-value="setGlobalOption(key, value, optionStatus)">
            {context.globalOptions[option.key]}
            </div>
    )
    render() {
        return <div>
            <section className="content no-padding">
                <div className="settings-table striped hoverable">
                    {options}
                </div>
            </section>
<section className="content no-padding">
    <div className="nav-tabs-custom">
        <ul className="nav nav-tabs" ng-if="task">
            <li className={ context.currentTab === 'overview' ? 'active' }
                <a className="pointer-cursor" onClick={changeTab('overview')} translate>Overview</a>
            </li>
            <li className={ context.currentTab === 'blocks' ? 'active': null }>
                <a className="pointer-cursor" onClick={changeTab('blocks')} translate>Blocks</a>
            </li>
            <li className={context.currentTab === 'filelist' ? 'active'}>
                <a className="pointer-cursor" onClick={changeTab('filelist')} translate>Files</a>
            </li>
            <li className={'active': context.currentTab === 'btpeers'}" ng-if="task && task.status === 'active' && task.bittorrent>
                <a className="pointer-cursor" onClick={changeTab('btpeers')} translate>Peers</a>
            </li>
            <li className={'active': context.currentTab === 'settings'}" ng-if="task && (task.status === 'active' || task.status === 'waiting' || task.status === 'paused')" className="slim>
                <a className="pointer-cursor" onClick={changeTab('settings')}>
                    <i className="fa fa-gear"></i>
                </a>
            </li>
        </ul>

        <div className="tab-content no-padding">
            <div className={"tab-pane ${'active': context.currentTab === 'overview'}"}>
                <div id="overview-items" className="settings-table striped hoverable" ng-mousedown="onOverviewMouseDown()" data-toggle="context" data-target="#task-overview-contextmenu">
                    <div className="row" ng-if="task">
                        <div className="setting-key col-sm-4">
                            <span translate>Task Name</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span className="allow-word-break" ng-tooltip-container="body" ng-tooltip-placement="bottom"
                                 data-toggle="tooltip" title="{{(task.bittorrent && task.bittorrent.comment) ? task.bittorrent.comment : task.taskName}}">{task.taskName}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task">
                        <div className="setting-key col-sm-4">
                            <span translate>Task Size</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{task.totalLength | readableVolume}</span>
                            <a className="pointer-cursor" ng-if="task.files" onClick={changeTab('filelist')}>
                                <span>{('format.settings.file-count' | translate: {count: task.selectedFileCount})}</span>
                            </a>
                        </div>
                    </div>
                    <div className="row" ng-if="task">
                        <div className="setting-key col-sm-4">
                            <span translate>Task Status</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{task | taskStatus | translate: {errorcode: task.errorCode}}</span>
                            <i className="icon-primary fa fa-question-circle" ng-if="task.errorCode && task.errorCode != '0' && task.errorMessage"
                                 data-toggle="tooltip" title="{{task.errorMessage}}" ng-tooltip-container="body" ng-tooltip-placement="top"></i>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.status === 'error' && task.errorDescription">
                        <div className="setting-key col-sm-4">
                            <span translate>Error Description</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{task.errorDescription | translate}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task">
                        <div className="setting-key col-sm-4">
                            <span>{('Progress' | translate) + (task.status === 'active' && task.bittorrent ? ' (' + ('Health Percentage' | translate) + ')' : '')}</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{(task.completePercent | percent: 2) + '%' + (task.status === 'active' && task.bittorrent ? ' (' + (context.healthPercent | percent: 2) + '%' + ')' : '')}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task">
                        <div className="setting-key col-sm-4">
                            <span translate>Download</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{(task.completedLength | readableVolume) + (task.status === 'active' ? ' @ ' + (task.downloadSpeed | readableVolume) + '/s' : '')}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.bittorrent">
                        <div className="setting-key col-sm-4">
                            <span translate>Upload</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{(task.uploadLength | readableVolume) + (task.status === 'active' ? ' @ ' + (task.uploadSpeed | readableVolume) + '/s' : '')}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.bittorrent">
                        <div className="setting-key col-sm-4">
                            <span translate>Share Ratio</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{(task.shareRatio | number: 2)}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.status === 'active' && task.completedLength < task.totalLength">
                        <div className="setting-key col-sm-4">
                            <span translate>Remain Time</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{0 <= task.remainTime && task.remainTime < 86400? (task.remainTime | dateDuration: 'second': 'HH:mm:ss') : ('More Than One Day' | translate)}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.status === 'active'">
                        <div className="setting-key col-sm-4">
                            <span>{(task.bittorrent ? ('Seeders' | translate) + ' / ' : '') + ('Connections' | translate)}Connections</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{(task.numSeeders ? (task.numSeeders + ' / ') : '') + task.connections}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.bittorrent && task.bittorrent.creationDate">
                        <div className="setting-key col-sm-4">
                            <span translate>Seed Creation Time</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span>{task.bittorrent.creationDate | amFromUnix | longDate}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.infoHash">
                        <div className="setting-key col-sm-4">
                            <span translate>Info Hash</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span className="allow-word-break">{task.infoHash}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.singleUrl">
                        <div className="setting-key col-sm-4">
                            <span translate>Download Url</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span className="allow-word-break">{task.singleUrl}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task">
                        <div className="setting-key col-sm-4">
                            <span translate>Download Dir</span>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span className="allow-word-break">{task.dir}</span>
                        </div>
                    </div>
                    <div className="row" ng-if="task && task.bittorrent && task.bittorrent.announceList && task.bittorrent.announceList.length > 0">
                        <div className="setting-key col-sm-4">
                            <span translate>BT Tracker Servers</span>
                            <em className="description-inline">{'format.settings.total-count' | translate: {count: task.bittorrent.announceList.length}}</em>
                            <i className="icon-expand pointer-cursor fa" ng-if="task.bittorrent.announceList.length > 1"
                               className={'fa-plus': context.collapseTrackers, 'fa-minus': !context.collapseTrackers}
                               onClick={context.collapseTrackers = !context.collapseTrackers}
                              data-toggle="tooltip" title="{{(context.collapseTrackers ? 'Expand' : 'Collapse') | translate}}"></i>
                        </div>
                        <div className="setting-value col-sm-8">
                            <span className="multi-line auto-ellipsis" ng-bind="serverAddress.length ? serverAddress.join(',') : serverAddress"data-toggle="tooltip" title="{{serverAddress.length ? serverAddress.join(',') : serverAddress}}"
                                 ng-repeat="serverAddress in task.bittorrent.announceList | limitTo: (context.collapseTrackers ? 1 : task.bittorrent.announceList.length)"></span>
                        </div>
                    </div>
                </div>
                <div className="settings-table">
                    <div className="row no-hover no-background" ng-if="context.isEnableSpeedChart && task && task.status === 'active'">
                        <div className="col-sm-12">
                            <div className="task-status-chart-wrapper">
                                <ng-chart ng-data="context.statusData" height="200"></ng-chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane ${'active': context.currentTab === 'blocks'}"}>
                <div className="piece-legends">
                    <div className="piece-legend"data-toggle="tooltip" title="{{('format.task.pieceinfo' | translate: {completed: task.completedPieces, total: task.numPieces})}}">
                        <div className="piece piece-completed"></div><span translate>Completed</span>
                    </div>
                    <div className="piece-legend"data-toggle="tooltip" title="{{('format.task.pieceinfo' | translate: {completed: task.completedPieces, total: task.numPieces})}}">
                        <div className="piece"></div><span translate>Uncompleted</span>
                    </div>
                </div>
                <ng-piece-map bit-field="task.bitfield" piece-count="task.numPieces"></ng-piece-map>
            </div>
            <div className={"tab-pane ${'active': context.currentTab === 'filelist'}"}>
                <div className="task-table">
                    <div className="task-table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <a onClick={changeFileListDisplayOrder('name:asc', true)} className={true: 'default-cursor'}[task.multiDir] translate>File Name</a>
                                <i ng-if="!task.multiDir" className={"fa ${'fa-sort-asc fa-order-asc': isSetFileListDisplayOrder('name:asc'), 'fa-sort-desc fa-order-desc': isSetFileListDisplayOrder('name:desc')}"}></i>
                                <a onClick={showChooseFilesToolbar()} ng-if="task && task.files && task.files.length > 1 && (task.status === 'waiting' || task.status === 'paused')" translate>(Choose Files)</a>
                            </div>
                            <div className="col-sm-2">
                                <a onClick={changeFileListDisplayOrder('percent:desc', true)} className={true: 'default-cursor'}[task.multiDir] translate>Progress</a>
                                <i ng-if="!task.multiDir" className={"fa ${'fa-sort-asc fa-order-asc': isSetFileListDisplayOrder('percent:asc'), 'fa-sort-desc fa-order-desc': isSetFileListDisplayOrder('percent:desc')}"}></i>
                            </div>
                            <div className="col-sm-2">
                                <a onClick={changeFileListDisplayOrder('size:asc', true)} className={true: 'default-cursor'}[task.multiDir] translate>File Size</a>
                                <i ng-if="!task.multiDir" className={"fa ${'fa-sort-asc fa-order-asc': isSetFileListDisplayOrder('size:asc'), 'fa-sort-desc fa-order-desc': isSetFileListDisplayOrder('size:desc')}"}></i>
                            </div>
                        </div>
                    </div>
                    <div className="task-table-title" ng-if="context.showChooseFilesToolbar">
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-xs btn-primary" onClick={selectFiles('all')} translate>Select All</button>
                                <button className="btn btn-xs btn-primary" onClick={selectFiles('none')} translate>Select None</button>
                                <button className="btn btn-xs btn-primary" onClick={selectFiles('reverse')} translate>Select Invert</button>
                                <button className="btn btn-xs btn-default" onClick={chooseSpecifiedFiles('video')}>
                                    <i className="fa fa-file-video-o"></i>
                                    <span translate>Videos</span>
                                </button>
                                <button className="btn btn-xs btn-default" onClick={chooseSpecifiedFiles('audio')}>
                                    <i className="fa fa-file-audio-o"></i>
                                    <span translate>Audios</span>
                                </button>
                                <button className="btn btn-xs btn-default" onClick={chooseSpecifiedFiles('picture')}>
                                    <i className="fa fa-file-picture-o"></i>
                                    <span translate>Pictures</span>
                                </button>
                                <button className="btn btn-xs btn-default" onClick={chooseSpecifiedFiles('document')}>
                                    <i className="fa fa-file-text-o"></i>
                                    <span translate>Documents</span>
                                </button>
                                <button className="btn btn-xs btn-default" onClick={chooseSpecifiedFiles('application')}>
                                    <i className="fa fa-file-o"></i>
                                    <span translate>Applications</span>
                                </button>
                                <button className="btn btn-xs btn-default" onClick={chooseSpecifiedFiles('archive')}>
                                    <i className="fa fa-file-archive-o"></i>
                                    <span translate>Archives</span>
                                </button>
                                <button className="btn btn-xs btn-success" onClick={saveChoosedFiles()} ng-disabled="!isAnyFileSelected()" translate>Confirm</button>
                                <button className="btn btn-xs btn-default" onClick={cancelChooseFiles()} translate>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div className="task-table-body">
                        <div className="row" ng-repeat="file in task.files | fileOrderBy: getFileListOrderType()"
                             ng-if="!context.collapsedDirs[file.relativePath]" data-file-index="{{file.index}}">
                            <div className="col-sm-10" ng-if="file.isDir" style="{{'padding-left: ' + (file.level * 16) + 'px'}}">
                                <i className="icon-dir-expand pointer-cursor fa" onClick={collapseDir(file)}
                                   className={true: 'fa-plus', false: 'fa-minus'}[!!context.collapsedDirs[file.nodePath]]
                                  data-toggle="tooltip" title="{{(context.collapsedDirs[file.nodePath] ? 'Expand' : 'Collapse') | translate}}">
                                </i><div className="checkbox checkbox-primary checkbox-inline">
                                    <input id="{{'node_' + file.nodePath}}" type="checkbox" ng-disabled="!task || !task.files || task.files.length <= 1 || (task.status !== 'waiting' && task.status !== 'paused')"
                                           ng-model="file.selected" ng-indeterminate="file.partialSelected" ng-change="setSelectedNode(file)"/>
                                    <label for="{{'node_' + file.nodePath}}" className="allow-word-break">{file.nodeName"data-toggle="tooltip" title="{{file.nodeName}}}</label>
                                </div>
                            </div>
                            <div className="col-sm-8" ng-if="!file.isDir" style="{{'padding-left: ' + (11 + 6 + file.level * 16) + 'px'}}">
                                <div className="checkbox checkbox-primary">
                                    <input id="{{'file_' + file.index}}" type="checkbox" ng-disabled="!task || !task.files || task.files.length <= 1 || (task.status !== 'waiting' && task.status !== 'paused')"
                                           ng-model="file.selected" ng-change="setSelectedFile(true)"/>
                                    <label for="{{'file_' + file.index}}" className="allow-word-break">{file.fileName"data-toggle="tooltip" title="{{file.fileName}}}</label>
                                </div>
                            </div>
                            <div className="col-sm-2" ng-if="!file.isDir">
                                <div className="progress">
                                    <div className="progress-bar progress-bar-primary" role="progressbar"
                                         aria-valuenow="{{file.completePercent}}" aria-valuemin="1"
                                         aria-valuemax="100" ng-style="{ width: file.completePercent + '%' }">
                                    <span className={'progress-lower': file.completePercent < 50}
                                         >{(file.completePercent | percent: 2) + '%'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <span className="task-size">{file.length | readableVolume}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane ${'active': context.currentTab === 'btpeers'}" ng-if="task && task.status === 'active' && task.bittorrent"}>
                <div className="task-table">
                    <div className="task-table-title">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <a onClick={changePeerListDisplayOrder('address:asc', true)} translate>Address</a>
                                <i className={"fa ${'fa-sort-asc fa-order-asc': isSetPeerListDisplayOrder('address:asc'), 'fa-sort-desc fa-order-desc': isSetPeerListDisplayOrder('address:desc')}"}></i>
                                <span>/</span>
                                <a onClick={changePeerListDisplayOrder('client:asc', true)} translate>Client</a>
                                <i className={"fa ${'fa-sort-asc fa-order-asc': isSetPeerListDisplayOrder('client:asc'), 'fa-sort-desc fa-order-desc': isSetPeerListDisplayOrder('client:desc')}"}></i>
                            </div>
                            <div className="col-md-5 col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <span translate>Status</span>
                                    </div>
                                    <div className="col-sm-6 text-right">
                                        <a onClick={changePeerListDisplayOrder('percent:desc', true)} translate>Progress</a>
                                        <i className={"fa ${'fa-sort-asc fa-order-asc': isSetPeerListDisplayOrder('percent:asc'), 'fa-sort-desc fa-order-desc': isSetPeerListDisplayOrder('percent:desc')}"}></i>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <a onClick={changePeerListDisplayOrder('dspeed:desc', true)} translate>Download</a>
                                <i className={"fa ${'fa-sort-asc fa-order-asc': isSetPeerListDisplayOrder('dspeed:asc'), 'fa-sort-desc fa-order-desc': isSetPeerListDisplayOrder('dspeed:desc')}"}></i>
                                <span>/</span>
                                <a onClick={changePeerListDisplayOrder('uspeed:desc', true)} translate>Upload</a>
                                <i className={"fa ${'fa-sort-asc fa-order-asc': isSetPeerListDisplayOrder('uspeed:asc'), 'fa-sort-desc fa-order-desc': isSetPeerListDisplayOrder('uspeed:desc')}"}></i>
                                <span translate>Speed</span>
                            </div>
                        </div>
                    </div>
                    <div className="task-table-body">
                        <div className="row" ng-repeat="peer in context.btPeers | peerOrderBy: getPeerListOrderType()">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="peer-name-wrapper auto-ellipsis"data-toggle="tooltip" title="{{(peer.client ? peer.client.info : '') + (peer.seeder ? (peer.client.info ? ', ' : '') + ('Seeding' | translate) : '')}}">
                                    <span>{peer.name | translate"></span><i className="icon-seeder fa fa-angle-double-up" ng-if="peer && peer.seeder}</i>
                                    <span className="peer-client" ng-if="!!peer.client"
                                       >{peer.client ? ('(' + peer.client.name + (peer.client.version ? ' ' + peer.client.version : '') + ')') : ''}</span>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-4 col-xs-12">
                                <div className="row">
                                    <div className="col-md-9 col-sm-7 col-xs-12">
                                        <div className="piece-bar-wrapper">
                                            <ng-piece-bar bit-field="peer.bitfield" piece-count="task.numPieces" color="#208fe5"></ng-piece-bar>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-5 hidden-xs text-right">
                                        <span>{(peer.completePercent | percent: 2) + '%'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="visible-xs col-xs-4">
                                <span>{(peer.completePercent | percent: 2) + '%'}</span>
                            </div>
                            <div className="col-md-3 col-sm-4 col-xs-8">
                                <div className="task-peer-download-speed">
                                    <i className="icon-download fa fa-arrow-down"></i>
                                    <span>{(peer.downloadSpeed | readableVolume) + '/s'}</span>&nbsp;
                                    <i className="icon-upload fa fa-arrow-up"></i>
                                    <span>{(peer.uploadSpeed | readableVolume) + '/s'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row" ng-if="!context.btPeers || context.btPeers.length < 1">
                            <div className="col-sm-12 text-center">
                                <span translate>No connected peers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"tab-pane ${'active': context.currentTab === 'settings'}" ng-if="task && (task.status === 'active' || task.status === 'waiting' || task.status === 'paused')"}>
                <div className="settings-table striped hoverable">
                    <ng-setting ng-repeat="option in context.availableOptions" option="option"
                                ng-model="context.options[option.key]" default-value="option.defaultValue"
                                on-change-value="setOption(key, value, optionStatus)"></ng-setting>
                </div>
            </div>
        </div>
    </div><!-- /.nav-tabs-custom -->
    <div id="task-overview-contextmenu">
        <ul className="dropdown-menu" role="menu">
            <li>
                <a id="mnu-overview-copy" tabindex="-1" className="mnu-copy pointer-cursor"data-toggle="tooltip" title="{{'Copy' | translate}}" onClick={copySelectedRowText()}>
                    <i className="fa fa-copy"></i>
                    <span translate>Copy</span>
                </a>
            </li>
        </ul>
    </div>
</section>
        </div>    }}

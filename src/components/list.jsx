import {Component} from 'react'

class List extends Component {
    render() {
        return <div>
            <section className="content no-padding">
                <div id="task-table" className="task-table">
                    <div className="task-table-title">
                        <div className="row">
                            <div className="col-md-8 col-sm-7">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <a onClick={changeDisplayOrder('name:asc', true)} translate>File Name</a>
                                        <i className={"fa ${'fa-sort-asc fa-order-asc': isSetDisplayOrder('name:asc') ${'fa-sort-desc fa-order-desc': isSetDisplayOrder('name:desc')}"}/>
                                    </div>
                                    <div className="col-sm-4">
                                        <a onClick={changeDisplayOrder('size:asc', true)} translate>File Size</a>
                                        <i className={"fa ${'fa-sort-asc fa-order-asc': isSetDisplayOrder('size:asc') $'fa-sort-desc fa-order-desc': isSetDisplayOrder('size:desc')}"}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-3">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <a onClick={changeDisplayOrder('percent:desc', true)} translate>Progress</a>
                                        <i className={"fa ${'fa-sort-asc fa-order-asc': isSetDisplayOrder('percent:asc') $'fa-sort-desc fa-order-desc': isSetDisplayOrder('percent:desc')}"}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <a onClick={changeDisplayOrder('remain:asc', true)} translate>Remain Time</a>
                                        <i className={"fa ${'fa-sort-asc fa-order-asc': isSetDisplayOrder('remain:asc') $'fa-sort-desc fa-order-desc': isSetDisplayOrder('remain:desc')}"}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-2">
                                <a onClick={changeDisplayOrder('dspeed:desc', true)} translate>Download Speed</a>
                                <i className={"fa ${'fa-sort-asc fa-order-asc': isSetDisplayOrder('dspeed:asc') $'fa-sort-desc fa-order-desc': isSetDisplayOrder('dspeed:desc')}"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"task-table-body ${'draggable': isSupportDragTask()}" dragula="'task-list'"}
                         dragula-model="taskContext.list">
                        <div className="row pointer-cursor"
                             ng-repeat="task in taskContext.list | filter: filterByTaskName | taskOrderBy: getOrderType()"
                             data-gid="{{task.gid}}" data-toggle="context" data-target="#task-table-contextmenu"
                             onClick={taskContext.selected[task.gid] = !taskContext.selected[task.gid]}>
                            <div className="col-md-8 col-sm-7 col-xs-12">
                                <div
                                    className={"checkbox checkbox-primary ${'checkbox-hide': !taskContext.selected[task.gid]}"}>
                                    <input id="{{'task_' + task.gid}}" type="checkbox"
                                           ng-model="taskContext.selected[task.gid]"/>
                                    <label htmlFor="{{'task_' + task.gid}}">
                                        <span className="task-name auto-ellipsis" ng-bind="task.taskName"
                                             data-toggle="tooltip" title="{{task.taskName}}"></span>
                                    </label>
                                </div>
                                <div className="task-files">
                                    <span>{task.totalLength | readableVolume}</span>
                                    <a ng-href="#!/task/detail/{{task.gid}}"
                                      data-toggle="tooltip" title="{{'Click to view task detail' | translate}}">
                                <span ng-if="task.files"
                                >{('format.settings.file-count' | translate: {count: task.selectedFileCount})}</span>
                                    </a><i className="icon-error fa fa-times"
                                           ng-if="task && task.status === 'error' && task.errorDescription"
                                          data-toggle="tooltip" title="{{task.errorDescription | translate}}"/>
                                    <i className="icon-seeder fa fa-arrow-up"
                                       ng-if="task && task.status === 'active' && task.seeder"
                                      data-toggle="tooltip" title="{{'Seeding' | translate}}"/>
                                    <a ng-if="task && task.status === 'error' && task.errorDescription && !task.bittorrent"
                                       onClick={restart(task)}data-toggle="tooltip" title="{{'Restart' | translate}}" translate>Restart</a>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-3 col-xs-12">
                                <div className="progress">
                                    <div
                                        className={"progress-bar ${'progress-bar-primary': task.status !== 'error', 'progress-bar-warning': task.status === 'error'}"}
                                        role="progressbar"
                                        aria-valuenow="{{task.completePercent}}" aria-valuemin="1"
                                        aria-valuemax="100" ng-style="{ width: task.completePercent + '%' }">
                            <span className={'progress-lower': task.completePercent < 50}
                            >{(task.completePercent | percent: 2) + '%'}</span>
                                    </div>
                                </div>
                                <div>
                        <span className="task-last-time"
                        >{task.status === 'waiting' ? '--:--:--' : (task.status === 'paused' ? '' : (task.status === 'active' ? ((0 <= task.remainTime && task.remainTime < 86400) ? (task.remainTime | dateDuration: 'second' : 'HH:mm:ss') : ('More Than One Day' | translate)) : ''))}</span>
                                    <span className="task-download-speed visible-xs-inline pull-right"
                                    >{task.status === 'waiting' ? ('Waiting' | translate) : (task.status === 'paused' ? ('Paused' | translate) : (task.status === 'active' ? (!task.seeder || task.downloadSpeed > 0 ? (task.downloadSpeed | readableVolume) + '/s' : '-') : ''))}</span>
                                    <span className="task-seeders pull-right"
                                    >{task.status === 'active' ? ((task.numSeeders ? (task.numSeeders + '/') : '') + task.connections) : ''}</span>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-2 hidden-xs">
                        <span className="task-download-speed"
                        >{task.status === 'waiting' ? ('Waiting' | translate) : (task.status === 'paused' ? ('Paused' | translate) : (task.status === 'active' ? (!task.seeder || task.downloadSpeed > 0 ? (task.downloadSpeed | readableVolume) + '/s' : '-') : ''))}</span>
                            </div>
                        </div>
                    </div>
                    <div id="task-table-contextmenu">
                        <ul className="dropdown-menu" role="menu">
                            <li ng-if="isSpecifiedTaskSelected('paused')">
                                <a tabIndex="-1" className="pointer-cursor"data-toggle="tooltip" title="{{'Start' | translate}}"
                                   onClick={changeTasksState('start')}>
                                    <i className="fa fa-play"/>
                                    <span translate>Start</span>
                                </a>
                            </li>
                            <li ng-if="isSpecifiedTaskSelected('active', 'waiting')">
                                <a tabIndex="-1" className="pointer-cursor"data-toggle="tooltip" title="{{'Pause' | translate}}"
                                   onClick={changeTasksState('pause')}>
                                    <i className="fa fa-pause"/>
                                    <span translate>Pause</span>
                                </a>
                            </li>
                            <li ng-if="isTaskSelected()">
                                <a tabIndex="-1" className="pointer-cursor"data-toggle="tooltip" title="{{'Delete' | translate}}"
                                   onClick={removeTasks()}>
                                    <i className="fa fa-trash-o"/>
                                    <span translate>Delete</span>
                                </a>
                            </li>
                            <li className="divider" ng-if="isTaskSelected()"/>
                            <li className="dropdown dropdown-submenu">
                                <a tabIndex="-1"data-toggle="tooltip" title="{{'Display Order' | translate}}" href="javascript:void(0);">
                                    <i className="fa fa-sort-alpha-asc"/>
                                    <span translate>Display Order</span>
                                </a>
                                <ul className="dropdown-menu" style="right: 160px;">
                                    <li>
                                        <a className="pointer-cursor" onClick={changeDisplayOrder('default:asc')}>
                                            <span translate>Default</span>
                                            <i className={"fa ${'fa-check': isSetDisplayOrder('default')}"}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="pointer-cursor" onClick={changeDisplayOrder('name:asc')}>
                                            <span translate>By File Name</span>
                                            <i className={"fa ${'fa-check': isSetDisplayOrder('name')}"}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="pointer-cursor" onClick={changeDisplayOrder('size:asc')}>
                                            <span translate>By File Size</span>
                                            <i className={"fa ${'fa-check': isSetDisplayOrder('size')}"}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="pointer-cursor" onClick={changeDisplayOrder('percent:desc')}>
                                            <span translate>By Progress</span>
                                            <i className={"fa ${'fa-check': isSetDisplayOrder('percent')}"}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="pointer-cursor" onClick={changeDisplayOrder('remain:asc')}>
                                            <span translate>By Remain Time</span>
                                            <i className={"fa ${'fa-check': isSetDisplayOrder('remain')}"}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="pointer-cursor" onClick={changeDisplayOrder('dspeed:desc')}>
                                            <span translate>By Download Speed</span>
                                            <i className={"fa ${'fa-check': isSetDisplayOrder('dspeed')}"}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="pointer-cursor" onClick={changeDisplayOrder('uspeed:desc')}>
                                            <span translate>By Upload Speed</span>
                                            <i className={"fa ${'fa-check': isSetDisplayOrder('uspeed')}"}/>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="divider" ng-if="isSingleUrlTaskSelected()"/>
                            <li ng-if="isSingleUrlTaskSelected()">
                                <a tabIndex="-1" className="pointer-cursor"data-toggle="tooltip" title="{{'Copy Download Url' | translate}}"
                                   onClick={copySelectedOneTaskDownloadLink()}>
                                    <i className="fa fa-copy"/>
                                    <span translate>Copy Download Url</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    }
}


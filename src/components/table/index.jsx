import React, { Fragment, PureComponent } from 'react';
import { isArray, isFunction, debounce, isNil } from 'loadsh'
import { Table } from 'antd';
import classNames from 'classnames';
import { stringSort, numberSort } from '@/utils'
import './style.less';

const defaultPagination = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100', '200'],
  showQuickJumper: true,
  showTotal: (total) => `总共 ${total} 条记录`
}
const sortConfig = {
  string: stringSort,
  number: numberSort
}
export default class CustomTable extends PureComponent {
  static defaultProps = {
    useAntdTable: false,
    className: '',
    align: 'left',
    bordered: true,
    allowRowClassName: true,
    evenRowClassName: '',
    oddRowClassName: ''
  }

  state = {
    page: 1,
    pageSize: 10
  }

  onChange = (page, pageSize) => {
    const { pagination } = this.props;
    this.setState({ page, pageSize })
    if (pagination && pagination.onChange) {
      pagination.onChange(page, pageSize);
    }
  }

  onShowSizeChange = (page, pageSize) => {
    const { pagination } = this.props;
    this.setState({ page, pageSize })
    if (pagination && pagination.onShowSizeChange) {
      pagination.onChange(page, pageSize);
    }
  }

  getScroll = () => {
    const { page, pageSize } = this.state;
    const { scroll = {}, dataSource, pagination = {} } = this.props;
    const { x, y } = scroll;
    let currentPageDatalen;
    if (pagination === false) {
      currentPageDatalen = isArray(dataSource) ? dataSource.length : 0;
    } else {
      const total = pagination.total || (isArray(dataSource) ? dataSource.length : 0);
      const lastPage = Math.ceil(total / pageSize);
      const lastPageDataLen = (total % pageSize) || pageSize;
      currentPageDatalen = page < lastPage ? pageSize : lastPageDataLen;
    }

    /**
     * 32：行高
     */
    if (y !== 0 && y && y > currentPageDatalen * 32) {
      return { x }
    }
    return scroll
  }

  selfIncreasingIndex = (record, row, index) => {
    const { page, pageSize } = this.state;
    return `${(page - 1) * pageSize + index + 1}`
  }

  customRender = u => {
    if (isNil(u) || u === '') {
      return '-'
    }
    return u
  }

  resetColumn = (columns, dataSource) => {
    let newColumns = [];
    if (columns) {
      newColumns = columns.map(item => {
        const dataIndex = item.dataIndex;
        const sortType = item.sortType;
        let sorter;

        if (sortType === 'custom') {
          sorter = true;
        } else {
          sorter = sortType ? sortConfig[sortType](dataIndex) : false
        }

        let seriaNum = {};
        if (item.title === '序号' || item.dataIndex === 'index') {
          seriaNum = {
            render: this.selfIncreasingIndex
          }
        }

        const drag = item.drag !== false;

        return {
          ellipsis: true,
          sorter,
          render: this.customRender,
          ...item,
          ...seriaNum,
          children: item.children && this.resetColumn(item.children, dataSource),
          title: (titleObj) => (
            <Fragment>
              {isFunction(item.title) ? item.title(titleObj) : item.title}
              {drag && <div className="resizeBar" onMouseDown={this.resizeColumn} />}
            </Fragment>
          )
        }
      })
    }
    return newColumns
  }

  resizeColumn = e => {
    let index = 0;
    let elem = e.currentTarget;
    for (; (elem = elem.parentElement) && elem.tagName !== 'TH';);
    // eslint-disable-next-line no-cond-assign
    for (; elem = elem.previousElementSibling; index++);
    if (this.props.rowSelection && index > 0) {
      index--
    }
    let width = this.props.columns[index].width; // 取DOM节点的宽度
    width = width ? parseInt(width, 10) : width;
    elem = e.currentTarget;
    for (; (elem = elem.parentElement) && elem.tagName !== 'THEAD';) {
      elem.style['user-select'] = 'none';
    }

    // 创建一个蒙层
    const tableCover = document.createElement('div');
    tableCover.id = 'tableCover';
    const style = {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 100,
      cursor: 'col-resize'
    }

    Object.keys(style).forEach(key => {
      tableCover.style[key] = style[key]
    })
    document.body.appendChild(tableCover);
    const origin = e.clientX;
    document.onmousemove = debounce(er => {
      const delta = er.clientX - origin;
      if (width + delta > 10) {
        this.props.columns[index].width = width + delta;
        this.forceUpdate()
      }
    }, 10, { 'leading': false, 'trailing': true });

    document.onmouseup = () => {
      document.body.removeChild(tableCover);
      elem.style['user-select'] = 'initial';
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

  render() {
    const {
      className,
      dataSource: propsDataSource,
      allowRowClassName,
      evenRowClassName,
      oddRowClassName,
      simplePagination,
      columns,
      pagination = {},
      scroll = {},
      rowClassName,
      ...otherProps
    } = this.props;
    const isChildren = columns.some(item => !!item.children);
    const dataSource = isArray(propsDataSource) ? propsDataSource : [];
    console.log('dataSource:', dataSource);
    console.log(this.props)
    const tableClassName = classNames(simplePagination ? 'commonTable simplePagination' : 'commonTable', className, !dataSource.length && scroll.x && `emptyTable${isChildren ? 2 : 1}`);
    const computedScroll = this.getScroll();
    return (
      <div className="commonTableWrapper">
        <Table
          dataSource={dataSource}
          scroll={dataSource.length ? computedScroll : {}}
          pagination={pagination && {
            ...defaultPagination,
            ...pagination,
            onChange: this.onChange,
            onShowSizeChange: this.onShowSizeChange,
            total: Number(pagination.total)
          }}
          className={tableClassName}
          rowClassName={
            rowClassName || ((record, index) => (
              allowRowClassName ? index % 2 === 0
                ? `evenRowStyle ${evenRowClassName}`
                : `oddRowStyle ${oddRowClassName}` : ''
            ))
          }
          {...otherProps}
          columns={columns && this.resetColumn(columns, dataSource)}
        />
      </div>
    )
  }
}

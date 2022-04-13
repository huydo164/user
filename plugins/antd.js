/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import Vue from 'vue'

import {
  Button,
  Calendar,
  Card,
  Checkbox,
  Col,
  Collapse,
  ConfigProvider,
  DatePicker,
  Dropdown,
  FormModel,
  Icon,
  Input,
  Layout,
  Menu,
  Modal,
  notification,
  Popconfirm,
  Result,
  Row,
  Select,
  Spin,
  Table,
  Tooltip,
  Tree
} from 'ant-design-vue'

Vue.use(Button)
Vue.use(Calendar)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(ConfigProvider)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Popconfirm)
Vue.use(Result)
Vue.use(Row)
Vue.use(Select)
Vue.use(Spin)
Vue.use(Table)
Vue.use(Tooltip)
Vue.use(Tree)

Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm

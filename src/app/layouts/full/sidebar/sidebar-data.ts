import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Bảng điều khiển',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'QUẢN LÝ CHUYẾN XE',
    divider: true
  },
  {
    displayName: 'Quản lý tuyến đường',
    iconName: 'material-symbols:directions-bus',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'solar:list-check-line-duotone',
        route: '/ui-components/routesGetAll',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'solar:document-line-duotone',
        route: '/ui-components/routesAdd',
      },
    ]
  },
  {
    displayName: 'Quản lý chuyến xe',
    iconName: 'material-symbols:directions-bus',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'solar:list-check-line-duotone',
        route: '/ui-components/busGetAll',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'solar:document-line-duotone',
        route: '/ui-components/busAdd',
      },
    ]
  },
  {
    displayName: 'Quản lý xe',
    iconName: 'mdi:bus',
    children: [
      {
        displayName: 'Danh sách xe',
        iconName: 'mdi:clipboard-list-outline',
        route: '/ui-components/busesGetAll',
      },
      {
        displayName: 'Thêm xe mới',
        iconName: 'mdi:file-document-edit-outline',
        route: '/ui-components/busesAdd',
      },
    ]
  },
{
  displayName: 'Quản lý loại xe',
  iconName: 'mdi:bus-multiple',
  children: [
    {
      displayName: 'Danh sách loại xe',
      iconName: 'solar:list-check-line-duotone',
      route: '/ui-components/busTypeGetAll',
    },
    {
      displayName: 'Thêm loại xe',
      iconName: 'solar:document-line-duotone',
      route: '/ui-components/busTypeAdd',
    },
  ]
},
  {
    navCap: 'QUẢN LÝ  TÀI KHOẢN',
    divider: true
  },
  {
    displayName: 'Quản lý tài xế',
    iconName: 'mdi:account-tie',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'solar:list-check-line-duotone',
        route: '/ui-components/driverGetAll',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'solar:document-line-duotone',
        route: '/ui-components/driverAdd',
      },
    ]
  },
  {
    displayName: 'Quản lý tài khoản',
    iconName: 'mdi:account-cog',
    route: '/ui-components/UserGetAll',
  },
  {
    navCap: 'QUẢN LÝ CHUNG',
    divider: true
  },
{
  displayName: 'Quản lý Blog',
  iconName: 'mdi:note-text-outline',
  children: [
    {
      displayName: 'Danh sách bài viết',
      iconName: 'solar:list-check-line-duotone',
      route: '/ui-components/blogGetAll',
    },
    {
      displayName: 'Thêm bài viết',
      iconName: 'solar:document-line-duotone',
      route: '/ui-components/blogAdd',
    },
  ]
},
{
  "displayName": "Quản lý Vé",
  "iconName": "mdi:ticket-confirmation",
  "children": [
    {
      "displayName": "Danh sách vé",
      "iconName": "solar:list-check-line-duotone",
      "route": "/ui-components/ticketGetAll"
    },
    {
      "displayName": "Đã thanh toán",
      "iconName": "mdi:credit-card-check-outline",
      "route": "/ui-components/ticketPaid"
    },
    {
      "displayName": "Đã hủy",
      "iconName": "mdi:cancel",
      "route": "/ui-components/ticketCanceled"
    }
  ]
},
{
  "displayName": "Quản lý Đánh Giá",
  "iconName": "solar:star-line-duotone",
  "route": "/ui-components/reviews"
},
  {
    displayName: 'Chips',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Forms',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
  },
  {
    navCap: 'Extra',
    divider: true
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
  },
  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Đăng nhập',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Đăng nhập',
        subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      }
    ],
  },
  {
    displayName: 'Đăng ký',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Đăng ký',
        subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      },
    ],
  },

];

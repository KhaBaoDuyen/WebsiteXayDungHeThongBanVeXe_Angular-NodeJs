import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Bảng điều khiển',
    iconName: 'solar:widget-add-line-duotone',
    route: '/admin/dashboard',
  },
  {
    navCap: 'QUẢN LÝ CHUYẾN XE',
    divider: true
  },
  {
    displayName: 'Quản lý tuyến đường',
    iconName: 'solar:routing-2-bold',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'solar:list-check-line-duotone',
        route: '/admin/routesGetAll',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'solar:document-line-duotone',
        route: '/admin/routesAdd',
      },
    ]
  },
  {
    displayName: 'Quản lý chuyến xe',
    iconName: 'solar:route-bold',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'solar:list-check-line-duotone',
        route: '/admin/busGetAll',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'solar:document-line-duotone',
        route: '/admin/busAdd',
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
        route: '/admin/busesGetAll',
      },
      {
        displayName: 'Thêm xe mới',
        iconName: 'mdi:file-document-edit-outline',
        route: '/admin/busesAdd',
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
        route: '/admin/busTypeGetAll',
      },
      {
        displayName: 'Thêm loại xe',
        iconName: 'solar:document-line-duotone',
        route: '/admin/busTypeAdd',
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
        route: '/admin/driverGetAll',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'solar:document-line-duotone',
        route: '/admin/driverAdd',
      },
    ]
  },
  {
    displayName: 'Quản lý tài khoản',
    iconName: 'mdi:account-cog',
    children: [
      {
        displayName: 'Danh sách',
        iconName: 'solar:list-check-line-duotone',
        route: '/admin/userGetAll',
      },
      {
        displayName: 'Thêm mới',
        iconName: 'solar:document-line-duotone',
        route: '/admin/userAdd'
      },
    ]
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
        route: '/admin/blogGetAll',
      },
      {
        displayName: 'Thêm bài viết',
        iconName: 'solar:document-line-duotone',
        route: '/admin/blogAdd',
      },
    ]
  },
  {
    displayName: 'Quản lý Vé',
    iconName: "mdi:ticket-confirmation",
    children: [
      {
        displayName: "Danh sách vé",
        iconName: "solar:list-check-line-duotone",
        route: "/admin/ticketGetAll"
      },
      {
        displayName: "Đã thanh toán",
        iconName: "mdi:credit-card-check-outline",
        route: "/admin/ticketPaid"
      },
      {
        displayName: "Đã hủy",
        iconName: "mdi:cancel",
        route: "/admin/ticketCanceled"
      }
    ]
  },
  {
    displayName: "Quản lý Đánh Giá",
    iconName: "solar:star-line-duotone",
    route: "/admin/reviews"
  },
  {
    displayName: "Quản lý Liên hệ",
    iconName: "solar:mailbox-bold",
    route: "/admin/contactGetAll"
  },
  {
    navCap: 'Extra',
    divider: true
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/admin/extra/icons',
  },
  {
    divider: true,
    navCap: 'Tài khoản',
  },
  {
    displayName: 'Đăng nhập',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication/login',
  },
  {
    displayName: 'Đăng ký',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication/register',
  },


];

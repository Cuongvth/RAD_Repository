export default [
  {
    title: "Home",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
  },
  { heading: "Google Vision" },
  {
    title: "Google Vision",
    icon: { icon: "tabler-smart-home" },
    children: [
      {
        title: "Nhận dạng trực tiếp",
        to: { name: "nhan-dang-truc-tiep" },
      },
      {
        title: "Dữ liệu chờ xử lí",
        to: { name: "du-lieu-cho-xu-li" },
      },
      {
        title: "Căn cước công dân",
        to: { name: "can-cuoc-cong-dan" },
      },
      {
        title: "Giấy phép lái xe",
        to: { name: "giay-phep-lai-xe" },
      },
    ],
    badgeClass: "bg-primary",
  },
];

export default [
  {
    title: "Home",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
  },
  { heading: "LTS Tech R&D" },
  {
    title: "T6 - Nhận Dạng Thẻ",
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
  {
    title: "T7 - ChatBot DMT du lịch Việt",
    icon: { icon: "tabler-smart-home" },
    children: [
      {
        title: "Chat Bot",
        to: { name: "travel_assistant_chatbot" },
      },
    ],
    badgeClass: "bg-primary",
  },
];

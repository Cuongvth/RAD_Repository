export default [
  {
    title: "Home",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
  },
  { heading: "LTS Tech R&D" },
  {
    title: "T6 - Nhận Dạng Thẻ",
    icon: { icon: "tabler-scan-eye" },
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
    icon: { icon: "tabler-brand-twitch" },
    children: [
      {
        title: "Chat Bot",
        to: { name: "travel_assistant_chatbot" },
      },
      {
        title: "Chat Bot V2",
        to: { name: "chat-bot-v2" },
      },
      {
        title: "Chat Bot V2 Upload File",
        to: { name: "chat-bot-v2-upload-file" },
      },
    ],
    badgeClass: "bg-primary",
  },
  {
    title: "T7 - AI dịch tài liệu đa dinh dạng (EN-KR-JP)",
    icon: { icon: "tabler-language-hiragana" },
    children: [
      {
        title: "AI Dịch Tài Liệu",
        to: { name: "ai_document_translation" },
      },
    ],
    badgeClass: "bg-primary",
  },
  {
    title: "T8 - Nhận dạng hình ảnh",
    icon: { icon: "tabler-device-cctv" },
    children: [
      {
        title: "Nhận dạng hình ảnh",
        to: { name: "nhan_dang_hinh_anh" },
      },
      {
        title: "Nhận dạng khói lửa",
        to: { name: "nhan_dang_khoi_lua" },
      },
    ],
    badgeClass: "bg-primary",
  },
  {
    title: "T8 - Insight 2.0",
    icon: { icon: "tabler-apps" },
    children: [
      {
        title: "Demo Insight 2.0",
        to: { name: "demo_insight" },
      },
    ],
    badgeClass: "bg-primary",
  },
];

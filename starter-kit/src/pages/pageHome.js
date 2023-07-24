import avatar1 from "@images/avatars/avatar-1.png";

export const content = [
  {
    key: "T6",
    title: "T6 - Nhận dạng thẻ 🚀",
    subtitle:
      "Giới thiệu sản phẩm: Hệ thống Nhận dạng Giấy tờ Cá nhân và Bóc tách Thông tin.",
    content: [
      "Chào mừng! Chúng tôi giới thiệu sản phẩm của mình - Hệ thống Nhận dạng Giấy tờ Cá nhân và Bóc tách Thông tin. Đây là một giải pháp hiệu quả trong lĩnh vực công nghệ thông tin, giúp tự động nhận dạng các giấy tờ cá nhân và trích xuất thông tin từ chúng nhanh chóng và chính xác.Sứ mệnh của chúng tôi là giúp giảm thiểu công sức và thời gian xử lý hàng nghìn giấy tờ cá nhân hàng ngày. Với công nghệ tiên tiến, sản phẩm của chúng tôi có khả năng phân tích, nhận dạng và trích xuất thông tin từ các loại giấy tờ cá nhân như thẻ căn cước, giấy phép lái xe.Hệ thống sử dụng các rule nhận dạng và công nghệ xử lý hình ảnh bằng Google Vision để tự động nhận dạng và trích xuất nội dung từ giấy tờ cá nhân. \nĐiều này đảm bảo tính chính xác cao và có khả năng xử lý hàng loạt giấy tờ trong thời gian ngắn, giúp tiết kiệm thời gian và tăng năng suất công việc.Sản phẩm của chúng tôi có thể tích hợp vào các ứng dụng và hệ thống tự động hiện có của bạn, phù hợp với mọi loại tổ chức cần quản lý thông tin cá nhân một cách linh hoạt và đáng tin cậy.Cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi. \nHy vọng hệ thống Nhận dạng Giấy tờ Cá nhân và Bóc tách Thông tin sẽ mang lại giá trị và hỗ trợ tốt cho bạn và tổ chức của bạn.",
    ],
    linkdemo: "https://www.youtube.com/embed/z0KErzaQ0es",
    linkdoc:
      "https://lotuslts-my.sharepoint.com/:p:/r/personal/cuongvl_ltsgroup_tech/Documents/R%26D%20%20OCR%20Identify%20documents.pptx?d=wa73987b668274508901cbff4a6cf1029&csf=1&web=1&e=CheIiB",
    roadmap: [
      {
        title: `Xác định mục tiêu của OCR`,
        timeLine: `
    2023-03-08`,
        description: `Nhận dạng các loại giấy tờ cá nhân và bóc tách các thông tin trên đó. Giúp quá trình xử lí và quản lí giấy tờ trở nên tự động.`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-send`,
      },
      {
        title: `Xác định người dùng mục tiêu`,
        timeLine: `
    2023-03-22`,
        description: `Các công chức, viên chức nhà nước thường xuyên phải xử lí các loại giấy tờ cá nhân thủ công.`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-brush`,
      },
      {
        title: `Bóc tách nội dung toàn văn`,
        timeLine: `
    2023-04-05`,
        description: `Bóc tách nội dung toàn văn trên hình ảnh chụp các loại giấy tờ cá nhân bằng API google vision.`,
        author: `Nguyễn Đổng Khánh`,
        role: `Meomeo`,
        avatar: avatar1,
        icon: `tabler-message`,
      },
      {
        title: `Xác định đặc trưng của từng trường dữ liệu`,
        timeLine: `
    2023-04-17`,
        description: `Xây dựng hệ thống các đặc trưng của từng trường dữ liệu trên các loại giấy tờ khác nhau với các đặc điểm về vị trí, kích thước, v.v..
  `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
  `,
      },
      {
        title: `Xây dựng hệ thống từ điển`,
        timeLine: `
    2023-04-30`,
        description: `Sử dụng hệ thống từ điển để dự đoán các trường thông tin bị sai lệch và trả về dữ liệu đúng một số trường dữ liệu như họ tên, quốc tịch, địa chỉ, v.v..
  `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
  `,
      },
      {
        title: `Xây dựng giao diện với Web Service`,
        timeLine: `
    2023-05-11`,
        description: `Sử dụng Web Service để xây dựng giao diện người dùng cho phép nhận dạng, xem các dữ liệu đã nhận dạng, đánh giá độ chính xác, v.v..
  `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
  `,
      },
      {
        title: `Xây dựng giao diện với Mobie App`,
        timeLine: `
    2023-05-23`,
        description: `Sử dụng Mobie App để xây dựng giao diện người dùng cho phép nhận dạng trực tiếp với camera hoặc gửi dữ liệu sãn sàng nhận dạng
  `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
  `,
      },
      {
        title: `Triển khai và duy trì`,
        timeLine: `
    2023-05-27`,
        description: `Triển khai dự án trên các nền tảng hoặc ứng dụng mà người dùng có thể truy cập.
  `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
  `,
      },
    ],
  },
  {
    key: "T7.1",
    title: "T7 - ChatBot DMT du lịch Việt 🔒",
    subtitle: "Giới thiệu sản phẩm: Chatbot Hướng dẫn Du lịch thông minh.",
    content: [
      "Xin chào! Chúng tôi xin giới thiệu đến bạn một công nghệ trong lĩnh vực du lịch - Chatbot Hướng dẫn Du lịch thông minh. Đây là một sản phẩm sáng tạo được phát triển để cung cấp thông tin và hướng dẫn du lịch tận hưởng và khám phá các địa điểm du lịch trên toàn thế giới một cách dễ dàng và tiện lợi.",
      "Sứ mệnh của chúng tôi là tạo ra một trợ lý du lịch ảo thông minh, một chatbot có khả năng trò chuyện và cung cấp thông tin chi tiết, gợi ý và lời khuyên về các điểm đến du lịch. Chatbot Hướng dẫn Du lịch thông minh của chúng tôi sử dụng trí tuệ nhân tạo để hiểu và phản hồi các câu hỏi và yêu cầu của người dùng một cách tự nhiên và chính xác.",
      "Với Chatbot Hướng dẫn Du lịch thông minh, bạn có thể nhận được thông tin về các địa điểm du lịch nổi tiếng, như danh lam thắng cảnh, di sản văn hóa, những địa điểm ẩm thực hấp dẫn và nhiều hơn nữa. Chatbot có thể cung cấp thông tin về lịch trình du lịch, khuyến nghị hoạt động và trải nghiệm thú vị tại từng điểm đến. Ngoài ra, nó còn có thể đề xuất các chương trình du lịch phù hợp với sở thích và ngân sách của bạn.",
      "Chatbot Hướng dẫn Du lịch thông minh của chúng tôi cũng cung cấp thông tin về khách sạn, nhà hàng, cửa hàng mua sắm và dịch vụ du lịch khác tại các địa điểm du lịch. Bạn có thể tìm kiếm và đặt chỗ trực tuyến, nhận thông tin về giá cả, đánh giá và đề xuất dựa trên những đánh giá từ du khách khác.",
      "Cảm ơn bạn đã dành thời gian để tìm hiểu về sản phẩm của chúng tôi. Chúng tôi hy vọng rằng Chatbot Hướng dẫn Du lịch thông minh sẽ mang lại cho bạn trải nghiệm du lịch tuyệt vời và giúp bạn khám phá những điểm đến mới một cách dễ dàng và thú vị.",
    ],
    linkdemo: "https://www.youtube.com/embed/Kl_ViOGY7Tw",
    linkdoc:
      "https://lotuslts-my.sharepoint.com/:p:/r/personal/cuongvl_ltsgroup_tech/Documents/R%26D%20ChatBot%20Travel%20Assistant.pptx?d=wc9adfcc5805e4d1aa232ee35208d8a3f&csf=1&web=1&e=0zzOdH",
    roadmap: [
      {
        title: `Xác định mục tiêu của chatbot`,
        timeLine: `
  2023-03-08`,
        description: `Tư vấn du lịch, cung cấp thông tin về điểm đến, book khách sạn, gợi ý lịch trình, v.v..`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-send`,
      },
      {
        title: `Xác định người dùng`,
        timeLine: `
  2023-03-22`,
        description: `Khách du lịch tự do, khách du lịch gia đình, khách doanh nhân, v.v. Đặt các yêu cầu chức năng và phi chức năng cho chatbot, ví dụ: tìm kiếm điểm đến, đặt phòng, tính toán ngân sách, v.v. Thu thập dữ liệu: Tìm kiếm và thu thập dữ liệu về các điểm du lịch, khách sạn, nhà hàng, hoạt động giải trí , và hơn thế nữa. Thu thập thông tin về thị thực, thủ tục nhập cảnh, tiền tệ, ngôn ngữ và văn hóa địa phương`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-brush`,
      },
      {
        title: `Xây dựng cơ sở tri thức`,
        timeLine: `
  2023-04-05`,
        description: `Xây dựng cơ sở dữ liệu cho chatbot, hoạt động, v.v. bao gồm các thông tin về điểm đến, khách sạn, nhà hàng, giải trí Sắp xếp và cấu trúc dữ liệu một cách logic để chatbot có thể truy xuất thông tin dễ dàng`,
        author: `Nguyễn Đổng Khánh`,
        role: `Meomeo`,
        avatar: avatar1,
        icon: `tabler-message`,
      },
      {
        title: `Thiết kế giao diện`,
        timeLine: `
  2023-04-17`,
        description: `Xác định giao diện chatbot, bao gồm trò chuyện bằng văn bản hoặc giọng nói. Thiết kế giao diện người dùng dễ sử dụng và trực quan để tương tác với chatbot.
`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
`,
      },
      {
        title: `Xây dựng và huấn luyện chatbot`,
        timeLine: `
  2023-04-30`,
        description: `Sử dụng nền tảng chatbot để xây dựng và lập trình chatbot. Áp dụng kỹ thuật xử lý ngôn ngữ tự nhiên (NLP) để chatbot có thể hiểu và phản hồi thông tin từ người dùng. Huấn luyện chatbot bằng dữ liệu thu thập được để chatbot đưa ra câu trả lời chính xác và hợp lý.
`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
`,
      },
      {
        title: `Kết nối các dịch vụ và API bên ngoài`,
        timeLine: `
  2023-05-11`,
        description: `Kết nối chatbot với các dịch vụ và API bên ngoài để nhận thông tin theo thời gian thực, chẳng hạn như thông tin chuyến bay, giá vé, đánh giá khách sạn, v.v..
`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
`,
      },
      {
        title: `Kiểm tra và điều chỉnh`,
        timeLine: `
  2023-05-23`,
        description: `Kiểm tra và điều chỉnh chatbot để đảm bảo tính ổn định và hiệu suất của nó. Thử nghiệm với các tình huống và kịch bản khác nhau để đảm bảo chatbot có thể xử lý tốt các tình huống khác nhau.
`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
`,
      },
      {
        title: `Triển khai và duy trì`,
        timeLine: `
  2023-05-27`,
        description: `Triển khai chatbot trên các nền tảng hoặc ứng dụng mà người dùng có thể truy cập.
`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
`,
      },
    ],
  },
  {
    key: "T7.2",
    title: "T7 - AI dịch tài liệu đa dinh dạng (EN-KR-JP) 🔒",
    subtitle:
      "Giới thiệu sản phẩm: Dịch tài liệu PDF, Excel, Word, PowerPoint và xuất ra hình ảnh đã dịch từng trang.",
    content: [
      "Xin chào! Chúng tôi xin giới thiệu đến bạn một công nghệ đột phá trong lĩnh vực dịch tài liệu - Sản phẩm Dịch tài liệu PDF, Excel, Word, PowerPoint và xuất ra hình ảnh đã dịch từng trang. Đây là một giải pháp tiên tiến và thuận tiện để dịch các tài liệu văn bản chính xác và nhanh chóng từ định dạng PDF, Excel, Word và PowerPoint sang hình ảnh đã dịch.",
      "Sứ mệnh của chúng tôi là giúp bạn dễ dàng chuyển đổi và dịch các tài liệu văn bản sang ngôn ngữ mong muốn một cách nhanh chóng và hiệu quả. Sản phẩm của chúng tôi sử dụng công nghệ dịch máy thông minh và xử lý hình ảnh để nhận diện và dịch các văn bản trong tài liệu. Bạn chỉ cần tải lên tài liệu của mình và chọn ngôn ngữ đích, sau đó sản phẩm sẽ tự động xử lý, dịch và xuất ra hình ảnh đã dịch từng trang.",
      "Với Sản phẩm Dịch tài liệu PDF, Excel, Word, PowerPoint và xuất ra hình ảnh đã dịch từng trang của chúng tôi, bạn có thể dễ dàng chuyển đổi các tài liệu quan trọng, báo cáo, hợp đồng, tài liệu học tập và nhiều loại tài liệu khác sang ngôn ngữ mà bạn mong muốn. Bạn không cần phải tự mình dịch hoặc tìm kiếm dịch giả, tiết kiệm thời gian và công sức đáng kể.",
      "Sản phẩm của chúng tôi hỗ trợ nhiều ngôn ngữ phổ biến và có khả năng xử lý các định dạng tài liệu phổ biến như PDF, Excel, Word và PowerPoint.",
      "Cảm ơn bạn đã dành thời gian để tìm hiểu về sản phẩm của chúng tôi. Chúng tôi hy vọng rằng Sản phẩm Dịch tài liệu PDF, Excel, Word, PowerPoint và xuất ra hình ảnh đã dịch từng trang sẽ là một công cụ hữu ích và giá trị trong quá trình làm việc và trao đổi thông tin.",
    ],
    linkdemo: "https://www.youtube.com/embed/cPZL7CcjdFo",
    linkdoc:
      "https://lotuslts-my.sharepoint.com/:p:/r/personal/cuongvl_ltsgroup_tech/Documents/AI_Interpreter.pptx?d=wa25cf0b39d114c14854e801271548c48&csf=1&web=1&e=8nZeQ5",
    roadmap: [
      {
        title: `Xác định mục tiêu của Ai_Interpreter`,
        timeLine: `
      2023-07-05`,
        description: `Dịch tài liệu PDF, Excel, Word, PowerPoint và xuất các trang đã dịch thành hình ảnh, v.v.`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-send`,
      },
      {
        title: `Lập kế hoạch và thiết lập dự án`,
        timeLine: `
      2023-07-07`,
        description: `Nghiên cứu nuget để sử dụng cho dự án. Xác định các yêu cầu và thông số kỹ thuật của dự án, đồng thời chọn và thiết lập môi trường phát triển`,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-brush`,
      },
      {
        title: `Chuyển đổi tài liệu và tạo hình ảnh`,
        timeLine: `
      2023-07-09`,
        description: `Triển khai chức năng tải lên các định dạng tài liệu khác nhau Tích hợp các nuget chuyển đổi tài liệu để chuyển đổi từng trang tài liệu thành hình ảnh`,
        author: `Nguyễn Đổng Khánh`,
        role: `Meomeo`,
        avatar: avatar1,
        icon: `tabler-message`,
      },
      {
        title: `Tích hợp google translate`,
        timeLine: `
      2023-07-12`,
        description: `Triển khai tích hợp với API google translate để nhận văn bản đã dịch cho từng khối.
        `,
        author: `Nguyễn Đổng Khánh`,
        role: `Meomeo`,
        avatar: avatar1,
        icon: `tabler-message`,
      },
      {
        title: `Chú thích và Lớp phủ bằng boundingPoly`,
        timeLine: `
      2023-07-14`,
        description: `Phát triển thuật toán chú thích để vẽ các hộp giới hạn dựa trên tọa độ boundingPoly được trích xuất.
    `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
    `,
      },
      {
        title: `Thiết kế chủ đề`,
        timeLine: `
      2023-07-17`,
        description: `Xác định giao diện AI_Interpreter, bao gồm cho phép tải lên tệp, chọn ngôn ngữ để dịch và tải xuống tệp sau khi chuyển đổi Thiết kế giao diện người dùng dễ sử dụng và trực quan để vận hành.
    `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
    `,
      },

      {
        title: `Triển khai giao diện và gọi API`,
        timeLine: `
      2023-07-19`,
        description: `Triển khai mã giao diện từ thiết kế và kết nối với API từ back-end.
    `,
        author: `Nguyễn Đổng Khánh`,
        role: `CTO`,
        avatar: avatar1,
        icon: `tabler-basket
    `,
      },
    ],
  },
];

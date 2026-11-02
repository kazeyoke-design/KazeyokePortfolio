/* ==================================================
   1. 作品データ (worksData)
   img/works/ 内の画像ファイルを指定します
   ================================================== */


    /* ==================================================
    Works Data
    --------------------------------------------------
    ■ ID
    ・全作品共通の一意な連番
    ・新規追加時は最大ID + 1
    ・削除後も既存IDは変更しない

    ■ Category
    ・illustration : イラスト
    ・design       : デザイン
    ・live2d       : Live2D

    ■ Image Naming Convention
    ・01_work_XX.png : Illustration
    ・02_work_XX.png : Design
    ・03_work_XX.png : Live2D

    ■ Display Order
    ・worksData の配列順に表示
    ・新しい作品は配列の先頭に追加
    ================================================== */


const worksData = [
  {
    id: 7,
    title: "Commission｜キャラクター立ち絵",
    category: "illustration",
    desc: "ご依頼いただいたキャラクターの全身立ち絵。",
    image: "images/works/01_work_03.png",
    createdAt: "2026-10"
  },

    {
    id: 2,
    title: "Adopt｜キャラクター販売立ち絵2",
    category: "illustration",
    desc: "既存キャラ販売用に制作したオリジナルキャラクターの全身立ち絵。",
    image: "images/works/01_work_02.png",
    createdAt: "2025"
  },

  {
    id: 1,
    title: "Adopt｜キャラクター販売立ち絵",
    category: "illustration",
    desc: "既存キャラ販売用に制作したオリジナルキャラクターの全身立ち絵。",
    image: "images/works/01_work_01.png",
    createdAt: "2025"
  },

  {
    id: 10,
    title: "Adopt｜キャラクター販売立ち絵3",
    category: "illustration",
    desc: "うちよそグッズ制作用SDイラスト。（女の子キャラクターはフォロワーのOCです）",
    image: "images/works/01_work_06.png",
    createdAt: "2026-"
  },

  {
    id: 11,
    title: "Commission｜キャラクター立ち絵",
    category: "illustration",
    desc: "ご依頼いただいたキャラクターの全身立ち絵。",
    image: "images/works/01_work_07.png",
    createdAt: "2025-"
  },


    {
    id: 8,
    title: "SDイラスト｜グッズ用",
    category: "illustration",
    desc: "うちよそグッズ制作用SDイラスト。（女の子キャラクターはフォロワーのOCです）",
    image: "images/works/01_work_04.png",
    createdAt: "2019-2"
  },

      {
    id: 9,
    title: "SDイラスト｜グッズ用2",
    category: "illustration",
    desc: "うちよそグッズ制作用SDイラスト。（青髪のキャラクターはフォロワーのOCです）",
    image: "images/works/01_work_05.png",
    createdAt: "2018-6"
  },



  {
    id: 3,
    title: "ロゴデザイン｜海老花メイ",
    category: "design",
    desc: "海老花メイ(@eat_lots_of_ebi) 様　ネームロゴのデザイン制作。",
    image: "images/works/02_work_01.png",
    createdAt: "2026-3"
  },
  {
    id: 4,
    title: "ロゴデザイン｜ポートフォリオ",
    category: "design",
    desc: "自分の活動名義のロゴデザイン。ポートフォリオサイトなどに使用。",
    image: "images/works/02_work_02.png",
    createdAt: "2026-10"
  },
  {
    id: 5,
    title: "Live2Dモデル｜原画、表情差分",
    category: "live2d",
    desc: "VTuber向けLive2Dモデリング。",
    image: "images/works/03_work_01.png",
    createdAt: "2026-9"
  },
 {
    id: 6,
    title: "Live2Dモデル｜動画",
    category: "live2d",
    type: "video",
    desc: "VTuber向けLive2Dモデリング・可動域設定。",
    thumbnail: "images/works/03_work_02.png",
    image: "images/videos/03_work_02.mp4",
    createdAt: "2026-9"
  },


  {
    id: 12,
    title: "Commission｜キャラクター立ち絵",
    category: "illustration",
    desc: "TRPGキャラクターの全身立ち絵。",
    image: "images/works/01_work_08.png",
    createdAt: "2022-2024"
  },

];
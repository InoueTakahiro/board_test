# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.create([{id: 1, name: "ドラマ"}, {id: 2, name: "バラエティ"}, {id: 3, name: "アニメ"}])
User.create!([{id: 1, user_id: "admin", name: "管理者", admin_flg: true, password: "123456", password_confirmation: "123456"}, 
             {id: 2, user_id: "user1", name: "テストユーザーⅠ", password: "000001", password_confirmation: "000001"}, 
             {id: 3, user_id: "user2", name: "テストユーザーⅡ", password: "000002", password_confirmation: "000002"}])

Post.create([
    {name: "イノウエ",
    mail: "inoue@inoue.jp",
    title: "あなたの番です",
    memo: "DVD発売決定だそうです！続編観たいーー！",
    category_id: 1,
    user_id: 2
    },
    {name: "植木ハル",
    mail: "haruharu@ueki.jp",
    title: "逃げ恥",
    memo: "スペシャル楽しみ。絶対観ます！",
    category_id: 1,
    user_id: 2
    },
    {name: "ナギサ",
    mail: "nagisa@naginagi.co.jp",
    title: "なぎささん",
    memo: "また続き観たいなー。第2弾待ってます！",
    category_id: 1,
    user_id: 3
    },
    {name: "ありあり",
    mail: "ariari@ariari.ac.jp",
    title: "有吉の壁",
    memo: "毎週の栄養補給。何回でも繰り返し観てられます。",
    category_id: 2,
    user_id: 2
    },
    {name: "東 京平",
    mail: "azuma@baby.co.jp",
    title: "東京 BABY BOYS 9",
    memo: "ぜひレギュラー化を！！ライブも楽しみにしてます！",
    category_id: 2,
    user_id: 2
    },
    {name: "永久",
    mail: "towa@tot.co.jp",
    title: "とある～～",
    memo: "バトルシーン！！",
    category_id: 3,
    user_id: 3
    },
])
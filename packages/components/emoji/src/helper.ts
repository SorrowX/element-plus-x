import { computed, ref } from 'vue'
import { useAxios } from '@vueuse/integrations/useAxios'

export type EmoticonListItem = {
  describe: string
  code: string
  text: string
  emojiId: number
  image: string
  icon?: string
  className?: string
  [key: string]: any
}

export type FontEmoticonListItem = {
  text: string
  [key: string]: any
}

export type EmoticonList = EmoticonListItem[]

export const emoticonBaseList = [
  {
    describe: '微笑',
    code: '/::)',
  },
  {
    describe: '撇嘴',
    code: '/::~',
  },
  {
    describe: '色',
    code: '/::B',
  },
  {
    describe: '发呆',
    code: '/::|',
  },
  {
    describe: '得意',
    code: '/:8-)',
  },
  {
    describe: '流泪',
    code: '/::<',
  },
  {
    describe: '害羞',
    code: '/::$',
  },
  {
    describe: '闭嘴',
    code: '/::X',
  },
  {
    describe: '睡',
    code: '/::Z',
  },
  {
    describe: '大哭',
    code: "/::'(",
  },
  {
    describe: '尴尬',
    code: '/::-|',
  },
  {
    describe: '发怒',
    code: '/::@',
  },
  {
    describe: '调皮',
    code: '/::P',
  },
  {
    describe: '呲牙',
    code: '/::D',
  },
  {
    describe: '惊讶',
    code: '/::O',
  },
  {
    describe: '难过',
    code: '/::(',
  },
  {
    describe: '酷',
    code: '/::+',
  },
  {
    describe: '冷汗',
    code: '/:--b',
  },
  {
    describe: '抓狂',
    code: '/::Q',
  },
  {
    describe: '吐',
    code: '/::T',
  },
  {
    describe: '偷笑',
    code: '/:,@P',
  },
  {
    describe: '愉快',
    code: '/:,@-D',
  },
  {
    describe: '白眼',
    code: '/::d',
  },
  {
    describe: '傲慢',
    code: '/:,@o',
  },
  {
    describe: '饥饿',
    code: '/::g',
  },
  {
    describe: '困',
    code: '/:|-)',
  },
  {
    describe: '惊恐',
    code: '/::!',
  },
  {
    describe: '流汗',
    code: '/::L',
  },
  {
    describe: '憨笑',
    code: '/::>',
  },
  {
    describe: '悠闲',
    code: '/::,@',
  },
  {
    describe: '奋斗',
    code: '/:,@f',
  },
  {
    describe: '咒骂',
    code: '/::-S',
  },
  {
    describe: '疑问',
    code: '/:?',
  },
  {
    describe: '嘘',
    code: '/:,@x',
  },
  {
    describe: '晕',
    code: '/:,@@',
  },
  {
    describe: '疯了',
    code: '/::8',
  },
  {
    describe: '衰',
    code: '/:,@!',
  },
  {
    describe: '骷髅',
    code: '/:!!!',
  },
  {
    describe: '敲打',
    code: '/:xx',
  },
  {
    describe: '再见',
    code: '/:bye',
  },
  {
    describe: '擦汗',
    code: '/:wipe',
  },
  {
    describe: '抠鼻',
    code: '/:dig',
  },
  {
    describe: '鼓掌',
    code: '/:handclap',
  },
  {
    describe: '糗大了',
    code: '/:&-(',
  },
  {
    describe: '坏笑',
    code: '/:B-)',
  },
  {
    describe: '左哼哼',
    code: '/:<@',
  },
  {
    describe: '右哼哼',
    code: '/:@>',
  },
  {
    describe: '哈欠',
    code: '/::-O',
  },
  {
    describe: '鄙视',
    code: '/:>-|',
  },
  {
    describe: '委屈',
    code: '/:P-(',
  },
  {
    describe: '快哭了',
    code: "/::'|",
  },
  {
    describe: '阴险',
    code: '/:X-)',
  },
  {
    describe: '亲亲',
    code: '/::*',
  },
  {
    describe: '吓',
    code: '/:@x',
  },
  {
    describe: '可怜',
    code: '/:8*',
  },
  {
    describe: '菜刀',
    code: '/:pd',
  },
  {
    describe: '西瓜',
    code: '/:<W>',
  },
  {
    describe: '啤酒',
    code: '/:beer',
  },
  {
    describe: '篮球',
    code: '/:basketb',
  },
  {
    describe: '乒乓',
    code: '/:oo',
  },
  {
    describe: '咖啡',
    code: '/:coffee',
  },
  {
    describe: '饭',
    code: '/:eat',
  },
  {
    describe: '猪头',
    code: '/:pig',
  },
  {
    describe: '玫瑰',
    code: '/:rose',
  },
  {
    describe: '凋谢',
    code: '/:fade',
  },
  {
    describe: '嘴唇',
    code: '/:showlove',
  },
  {
    describe: '爱心',
    code: '/:heart',
  },
  {
    describe: '心碎',
    code: '/:break',
  },
  {
    describe: '蛋糕',
    code: '/:cake',
  },
  {
    describe: '闪电',
    code: '/:li',
  },
  {
    describe: '炸弹',
    code: '/:bome',
  },
  {
    describe: '刀',
    code: '/:kn',
  },
  {
    describe: '足球',
    code: '/:footb',
  },
  {
    describe: '瓢虫',
    code: '/:ladybug',
  },
  {
    describe: '便便',
    code: '/:shit',
  },
  {
    describe: '月亮',
    code: '/:moon',
  },
  {
    describe: '太阳',
    code: '/:sun',
  },
  {
    describe: '礼物',
    code: '/:gift',
  },
  {
    describe: '拥抱',
    code: '/:hug',
  },
  {
    describe: '强',
    code: '/:strong',
  },
  {
    describe: '弱',
    code: '/:weak',
  },
  {
    describe: '握手',
    code: '/:share',
  },
  {
    describe: '胜利',
    code: '/:v',
  },
  {
    describe: '抱拳',
    code: '/:@)',
  },
  {
    describe: '勾引',
    code: '/:jj',
  },
  {
    describe: '拳头',
    code: '/:@@',
  },
  {
    describe: '差劲',
    code: '/:bad',
  },
  {
    describe: '爱你',
    code: '/:lvu',
  },
  {
    describe: 'NO',
    code: '/:no',
  },
  {
    describe: 'OK',
    code: '/:ok',
  },
  {
    describe: '爱情',
    code: '/:love',
  },
  {
    describe: '飞吻',
    code: '/:<L>',
  },
  {
    describe: '跳跳',
    code: '/:jump',
  },
  {
    describe: '发抖',
    code: '/:shake',
  },
  {
    describe: '怄火',
    code: '/:<O>',
  },
  {
    describe: '转圈',
    code: '/:circle',
  },
  {
    describe: '磕头',
    code: '/:kotow',
  },
  {
    describe: '回头',
    code: '/:turn',
  },
  {
    describe: '跳绳',
    code: '/:skip',
  },
  {
    describe: '投降',
    code: '/:oY',
  },
  // 兼容企业微信 选择[疯了]会被转为[折磨]的问题
  {
    describe: '折磨',
    code: '/::8',
  },
]

export const emoticonList: EmoticonList = emoticonBaseList.map(
  (item, index: number) => {
    const image =
      item.describe === '折磨'
        ? `https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/35.gif`
        : `https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif`
    return {
      ...item,
      image,
      emojiId: index,
      text: `[${item.describe}]`,
      className: `face${index}`,
    }
  }
)

export const emoticonListKeys = emoticonList.reduce(
  (buff: string[], item: EmoticonListItem) => {
    return buff.concat([item.code, item.text])
  },
  []
)

export const emoticonListMap = emoticonListKeys.reduce(
  (buff: Record<string, any>, value: string) => {
    const item = emoticonList.find(
      (_: EmoticonListItem) => _.code === value || _.text === value
    )
    return {
      ...buff,
      [value]: item?.['image'],
    }
  },
  {}
)

interface Categorie {
  id: string
  emojis: string[]
}
interface skinItem {
  unified: string
  native: string
}
interface emojiItem {
  id: string
  keywords: string[]
  name: string
  skins: skinItem[]
  version: number
}
interface EmojiMartData {
  categories: Categorie[]
  emojis: {
    [prop: string]: emojiItem
  }
  [prop: string]: any
}

const emojiMartData = ref<EmojiMartData | null>(null)

export const setEmojiMartData = (data: EmojiMartData) => {
  emojiMartData.value = data
}

const initRemoteData = async () => {
  const { execute } = useAxios()
  if (emojiMartData.value !== null) return
  await execute('https://cdn.jsdelivr.net/npm/@emoji-mart/data', {
    method: 'get',
  })
    .then((res: any) => {
      emojiMartData.value = res.response.value.data
    })
    .catch(() => {
      emojiMartData.value = null
    })
}

export const useFontEmoticon = () => {
  initRemoteData()

  const peopleList = computed<FontEmoticonListItem[]>(() => {
    const data = emojiMartData.value
    if (data) {
      const emojiKeys =
        data.categories.find((item: { id: string }) => item.id === 'people')
          ?.emojis ?? []
      const emojis = emojiKeys.map((key: string) => data['emojis'][key])
      const list = emojis.map((item) => item.skins[0]['native'])
      return list.map((text: string) => {
        return {
          text,
        }
      })
    } else {
      return []
    }
  })

  return {
    peopleList,
  }
}

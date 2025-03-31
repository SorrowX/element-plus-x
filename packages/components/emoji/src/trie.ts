// https://github.com/buddys/qq-wechat-emotion-parser/blob/master/src/trie.js

import { emoticonListKeys, emoticonListMap } from './helper'

export class Trie {
  words: number
  empty: number
  index: number
  children: any

  constructor() {
    this.words = 0
    this.empty = 1
    this.index = 0
    this.children = {}
  }

  insert(str: string, pos: number, idx: number) {
    if (str.length === 0) {
      return
    }
    if (pos === undefined) {
      pos = 0
    }
    if (pos === str.length) {
      this.index = idx
      return
    }
    const k = str[pos]
    if (this.children[k] === undefined) {
      this.children[k] = new Trie()
      this.empty = 0
      this.children[k].words = this.words + 1
    }
    const child = this.children[k]
    child.insert(str, pos + 1, idx)
  }

  build(arr: string[]) {
    const len = arr.length
    for (let i = 0; i < len; i++) {
      this.insert(arr[i], 0, i)
    }
  }

  searchOne(str: string, pos: number) {
    if (pos === undefined) {
      pos = 0
    }
    const result: any = {}
    if (str.length === 0) return result
    result.arr = []
    const k = str[pos]
    const child = this.children[k]
    if (child !== undefined && pos < str.length) {
      return child.searchOne(str, pos + 1)
    }
    if (child === undefined && this.empty === 0) return result
    if (this.empty == 1) {
      result.arr[0] = pos - this.words
      result.arr[1] = this.index
      result.words = this.words
      return result
    }
    return result
  }

  search(str: string) {
    if (this.empty == 1) return []
    const len = str.length
    const searchResult = []
    let tmp
    for (let i = 0; i < len - 1; i++) {
      tmp = this.searchOne(str, i)
      if (typeof tmp.arr !== 'undefined' && tmp.arr.length > 0) {
        searchResult.push(tmp.arr)
        i = i + tmp.words - 1
      }
    }
    return searchResult
  }
}

const trie = new Trie()
trie.build(emoticonListKeys)

function splice(str: string, index: number, count: number, add: string) {
  return str.slice(0, index) + add + str.slice(index + count)
}

/**
 * 文案转 -> img
 * eg: /::) -> <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif" alt="/::)">
 * eg: [微笑] -> <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif" alt="[微笑]">
 * @param text
 * @returns
 */
export const emotionParser = (text: string = '') => {
  const indices = trie.search(text)
  indices.reverse().forEach((idx: number[]) => {
    const pos = idx[0],
      emotion = emoticonListKeys[idx[1]],
      img = `<img src="${emoticonListMap[emotion]}" alt="${emotion}">`
    text = splice(text, pos, emotion.length, img)
  })
  return text
}

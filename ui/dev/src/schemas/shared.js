import copy from 'copy-anything'
import commafy from 'commafy-anything'

export const name = {
  id: 'name',
  required: true,
  label: '製品名',
  fieldType: 'input',
  valueType: 'string',
}
export const isGlobal = {
  id: 'isGlobal',
  label: '全社共有の製品',
  subLabel: `有効の場合、この製品が上記のデータで表示されます。
他社が上記のデータを更新すれば、その会社だけに反映されます。

以下のフィールドの初期設定は他社でも"空欄"として表示されます：
・「価格」に関するフィールド
・見積もり項目
・参考情報

こちらのトグルスイッチにて有効／無効にできます：
（無効にした場合、他社の製品一覧にて表示されなくなります）`,
  fieldType: 'toggle',
  valueType: 'boolean',
  style: {
    background: '#EDEDED',
    padding: '1em',
    borderRadius: '1em',
  },
}
export const maker = {
  id: 'maker',
  required: true,
  label: 'メーカー',
  fieldType: 'input',
  valueType: 'string',
}
export const itemCode = {
  id: 'itemCode',
  label: '品番',
  fieldType: 'input',
  valueType: 'string',
}
export const extraInfo = {
  id: 'extraInfo',
  label: '参考情報',
  subLabel: '提案時に表示されます',
  fieldType: 'textarea',
  valueType: 'string',
}
export const price = {
  id: 'price',
  label: '本体売価（税別）',
  subLabel: 'A:お客さんに提案する価格',
  fieldType: 'input',
  valueType: 'number',
  suffix: '円',
  format: commafy,
}
export const priceMin = {
  id: 'priceMin',
  label: '最低本体売価（税別）',
  subLabel: 'B:値引き交渉時の最低売価',
  fieldType: 'input',
  valueType: 'number',
  suffix: '円',
}
export const cost = {
  id: 'cost',
  label: '原価（税別）',
  subLabel: 'C:仕入原価',
  fieldType: 'input',
  valueType: 'number',
  suffix: '円',
}
export const constructionPrice = {
  id: 'constructionPrice',
  label: '施工費用売価（税別）',
  subLabel: 'A:お客さんに提案する価格',
  fieldType: 'input',
  valueType: 'number',
  suffix: '円',
  format: commafy,
}
export const constructionPriceMin = {
  id: 'constructionPriceMin',
  label: '施工費用最低売価（税別）',
  subLabel: 'B:値引き交渉時の最低売価',
  fieldType: 'input',
  valueType: 'number',
  suffix: '円',
}
export const constructionCost = {
  id: 'constructionCost',
  label: '施工費用原価（税別）',
  subLabel: 'C:仕入原価',
  fieldType: 'input',
  valueType: 'number',
  suffix: '円',
}
export const addItems = {
  id: 'addItems',
  label: '見積もり項目',
  subLabel: '販売時の追加の部材など',
  fieldType: 'form',
  valueType: 'array',
  schema: [
    {
      id: 'name',
      label: '商品名',
      fieldType: 'input',
      valueType: 'string',
    },
    {
      id: 'price',
      label: '本体売価（税別）',
      fieldType: 'input',
      valueType: 'number',
      suffix: '円',
    },
    {
      id: 'cost',
      label: '本体原価（税別）',
      fieldType: 'input',
      valueType: 'number',
      suffix: '円',
    },
  ],
}
export const imgData = {
  id: 'imgData',
  label: '画像',
  fieldType: 'img',
  valueType: 'array',
  deletable: true,
}
export const imgUpload = (productCategoryId) => {
  return {
    id: 'imgUpload',
    label: '画像をアップロード',
    fieldType: 'uploader',
    valueType: 'object',
    fileType: 'image',
    path: (doc, store) => `products/${productCategoryId}/${doc.id}/images`,
    showCondition: (doc, mode) => {
      return mode !== 'view'
    },

    onInput: (payload, {docId, fieldInput, mode}, store) => {
      const { fileId } = payload
      const doc = (mode === 'add')
        ? {imgData: []}
        : copy(store.state.products[productCategoryId].data[docId])
      if (!doc) throw new Error('doc not found!')
      const { imgData } = doc
      const index = imgData.findIndex(img => img.fileId === fileId)
      if (index === -1) {
        imgData.push(payload)
      } else {
        imgData.splice(index, 1, payload)
      }
      fieldInput({id: 'imgData', value: imgData})
    },
  }
}
export const pdfData = {
  id: 'pdfData',
  label: 'PDF',
  fieldType: 'pdf',
  valueType: 'array',
  deletable: true,
}
export const pdfUpload = (productCategoryId) => {
  return {
    id: 'pdfUpload',
    label: 'PDFをアップロード',
    fieldType: 'uploader',
    valueType: 'object',
    fileType: 'pdf',
    path: (doc, store) => `products/${productCategoryId}/${doc.id}/images`,
    showCondition: (doc, mode) => {
      return mode !== 'view'
    },

    onInput: (payload, {docId, fieldInput, mode}, store) => {
      const { fileId } = payload
      const doc = (mode === 'add')
        ? {pdfData: []}
        : copy(store.state.products[productCategoryId].data[docId])
      if (!doc) throw new Error('doc not found!')
      const { pdfData } = doc
      const index = pdfData.findIndex(pdf => pdf.fileId === fileId)
      if (index === -1) {
        pdfData.push(payload)
      } else {
        pdfData.splice(index, 1, payload)
      }
      fieldInput({id: 'pdfData', value: pdfData})
    },
  }
}
export const video = {
  id: 'video',
  label: 'YouTubeのPR動画',
  subLabel:　'YouTube動画のURLを貼り付けてください。',
  fieldType: 'video',
  valueType: 'string',
}
export const sizeW = {
  id: 'size.w',
  label: '幅(W)',
  fieldType: 'input',
  valueType: 'number',
  suffix: 'mm',
}
export const sizeH = {
  id: 'size.h',
  label: '高さ(H)',
  fieldType: 'input',
  valueType: 'number',
  suffix: 'mm',
}
export const sizeD = {
  id: 'size.d',
  label: '奥行(D)',
  fieldType: 'input',
  valueType: 'number',
  suffix: 'mm',
}

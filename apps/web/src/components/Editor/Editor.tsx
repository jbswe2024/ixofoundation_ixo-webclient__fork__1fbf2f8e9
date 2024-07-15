import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core'
import '@blocknote/core/fonts/inter.css'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'
import { Box } from '@mantine/core'
import { uploadFile } from 'components/Editor/uploadFile'
import { useEffect, useState } from 'react'
import { TEntityPageModel } from 'types/entities'
import { ImageBlock } from './CustomBlocks/Image/ImageBlock'
import { en } from './customDictionary'
import './Editor.css'
import FeaturedImage from './FeaturedImage/FeaturedImage'
import PageTitle from './PageTitle/PageTitle'

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    heroImage: ImageBlock,
  },
})

type Props = {
  editable?: boolean
  initialPage?: TEntityPageModel
  onChange?: (page: TEntityPageModel) => void
}

const EMPTY_PAGE: TEntityPageModel = {
  featuredImage: '',
  pageTitle: '',
  content: [],
}

const Editor = ({ editable = false, initialPage, onChange }: Props) => {
  const [page, setPage] = useState<TEntityPageModel>(initialPage || EMPTY_PAGE)

  useEffect(() => {
    setPage(initialPage || EMPTY_PAGE)
  }, [initialPage])

  const editor = useCreateBlockNote({
    schema,
    initialContent: page.content?.length ? page.content : undefined,
    uploadFile,
    dictionary: en,
  })

  useEffect(() => {
    if (page !== initialPage && onChange) {
      onChange(page)
    }
  }, [page, initialPage, onChange])

  const handleFeaturedImageChange = (image: string) => {
    setPage((prev) => ({ ...prev, featuredImage: image }))
  }

  const handleContentChange = () => {
    setPage((prev) => ({ ...prev, content: editor?.document as Block[] }))
  }

  const handlePageTitleChange = (title: string) => {
    setPage((prev) => ({ ...prev, pageTitle: title }))
  }

  return (
    <Box w='100%'>
      <FeaturedImage editable={editable} onChange={handleFeaturedImageChange} initialImage={page.featuredImage} />
      <PageTitle editable={editable} onChange={handlePageTitleChange} initialTitle={page.pageTitle} />
      <BlockNoteView editable={editable} editor={editor} onChange={handleContentChange} theme={'light'} />
    </Box>
  )
}

export default Editor

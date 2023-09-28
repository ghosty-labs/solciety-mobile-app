import React, { useState } from 'react'
import {
  StyledText,
  StyledTextInput,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { IconX } from '../Icons/Icon'
import { TAGS_MAX_LENGTH } from '../../constants/variables'

interface TagInputProps {
  setTopics: (tags: string[]) => void
}

const TagInput = ({ setTopics }: TagInputProps) => {
  const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [isMaxLength, setIsMaxLength] = useState<boolean>(false)

  const handleOnChangeText = (e: string) => {
    const _tags = '#' + tags.join('#') + e

    if (_tags.length >= TAGS_MAX_LENGTH) {
      setIsMaxLength(true)
      return
    }

    setInputValue(
      e.replace(/\s/g, '').replace(
        // eslint-disable-next-line no-useless-escape
        /[&/\\#,+()$~%.'":*?<>{}\[\]\!\-`^@_|•√π÷×¶∆£¢€¥°=©®™✓]/g,
        '',
      ),
    )
    setIsMaxLength(false)
  }

  const handleKeyDown = (text: string) => {
    if (!text.trim()) return

    setTags([...tags, text])
    setTopics([...tags, text])
    setInputValue('')
  }

  const removeTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    setTags(newTags)
    setTopics(newTags)
    setIsMaxLength(false)
  }

  return (
    <StyledView>
      <StyledView className="flex flex-row flex-wrap rounded-xl border border-dashed border-zinc-700">
        <StyledTextInput
          className="w-full pl-2 text-base text-white"
          placeholder="Input a topic"
          placeholderTextColor="#71717a"
          onChangeText={handleOnChangeText}
          value={inputValue}
          maxLength={isMaxLength ? 0 : TAGS_MAX_LENGTH}
          onSubmitEditing={() => handleKeyDown(inputValue)}
        />
      </StyledView>
      <StyledView className="flex flex-row flex-wrap mt-3">
        {tags.map((tag, index) => (
          <StyledView
            key={index}
            className="relative items-center p-1 m-1 mr-2 rounded-lg border border-zinc-500"
          >
            <StyledText className="text-base text-solana-green mr-4">
              #{tag}
            </StyledText>
            <StyledTouchableOpacity
              className="absolute -top-2 -right-2 w-5 h-5 p-1 rounded-full bg-zinc-700"
              onPress={() => removeTag(index)}
            >
              <IconX size={12} color="white" />
            </StyledTouchableOpacity>
          </StyledView>
        ))}
      </StyledView>
    </StyledView>
  )
}

export default TagInput

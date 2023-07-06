import {SharedValue} from 'react-native-reanimated';
import AnimatedContainer from '~components/atoms/AnimatedContainer/AnimatedContainer';
import SearchBar, {SearchBarProps} from '~components/molecules/SearchBar';
import TagList, {TagListProps} from '~components/molecules/TagList';
import {FilterDisplayState} from './types';

interface FilterProps {
  displayState: SharedValue<FilterDisplayState>;
  onSearch: SearchBarProps['onChangeText'];
  tags: TagListProps['tags'];
  onTagPress: (tagId: number) => void;
  selectedTags: number[];
}

const Filters: React.FC<FilterProps> = ({
  displayState,
  onSearch,
  onTagPress,
  tags,
  selectedTags,
}) => {
  return (
    <AnimatedContainer showChildren={displayState}>
      <SearchBar
        onChangeText={onSearch}
        onIconPress={() =>
          (displayState.value = displayState.value === 2 ? 1 : 2)
        }
      />
      <TagList
        tags={tags}
        selectedTags={selectedTags}
        onTagPress={onTagPress}
      />
    </AnimatedContainer>
  );
};

export default Filters;

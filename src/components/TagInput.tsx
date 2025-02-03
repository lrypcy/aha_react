import { useState } from 'react';

const TagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <div className="tag-input-container">
      <div className="input-group">
        <div className="tag-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag-item">
              {tag}
              <button
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                className="tag-remove"
                aria-label="删除标签"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="添加新标签..."
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="tag-input"
          />
        </div>
      </div>

      <style jsx>{`
        .input-group {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 4px;
        }
        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;
        }
        .tag-input {
          width: 200px;
          margin: 4px 0;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          flex-shrink: 0;
          height: 40px;
        }
        .tag-item {
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          font-size: 14px;
        }
        .tag-remove {
          margin-left: 2px;
          cursor: pointer;
          border: none;
          background: none;
          color: #666;
        }
        button {
          padding: 8px 16px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TagInput; 
from markitdown import MarkItDown

def run(path):
    markdown = MarkItDown()
    result = markdown.convert(path)
    return result


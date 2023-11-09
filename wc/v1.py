   # this code prompts the input but no output showing blank 
import requests
from bs4 import BeautifulSoup

def find_input_field_names(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    input_field_names = []
    for entry_tag in soup.find_all('entry-container'):
        question_tag = entry_tag.find('question-container')
        if question_tag:
            input_field_names.append(question_tag.find('div', class_='question-title').text)

    return input_field_names

if __name__ == '__main__':
    url =  "https://docs.google.com/forms/d/e/1FAIpQLSesPS4lV4NTlN96YCB9mg5vr4hP0z8Fxq2sY_Dn5qq315FDIA/viewform?usp=sf_link"
    input_field_names = find_input_field_names(url)
    print("List of input field names:")
    for name in input_field_names:
        print(name)
 


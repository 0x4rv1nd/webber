   # this code will prints some garbage content dont no why
import requests
from bs4 import BeautifulSoup

def find_input_fields(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    input_fields = []
    for input_tag in soup.find_all('input'):
        input_fields.append({
            'name': input_tag.get('name'),
            'type': input_tag['type'],
            'placeholder': input_tag.get('placeholder'),
            'label': input_tag.find_previous_sibling('label')
        })

    # Extract only the names of the input fields
    input_field_names = [input_field['name'] for input_field in input_fields]

    return input_field_names

if __name__ == '__main__':
    url = input("Enter the website URL: ")
    input_field_names = find_input_fields(url)
    print("List of input field names:")
    for name in input_field_names:
        print(name)

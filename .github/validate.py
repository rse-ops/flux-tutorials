#!/usr/bin/env python3

import argparse
import json
import os
import sys

import jsonschema

here = os.path.abspath(os.path.dirname(__file__))
root = os.path.dirname(here)


def read_json(filename):
    with open(filename, "r") as fd:
        content = json.loads(fd.read())
    return content


schema_url = "http://json-schema.org/draft-07/schema"

project = {
    "type": "object",
    "properties": {
        "github": {"type": "string"},
    },
    "required": [
        "github",
    ],
    "additionalProperties": False,
}


notebooks = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "name",
            "title",
        ],
        "properties": {
            "name": {"type": "string"},
            "title": {"type": "string"},
        },
    },
}

# Currently all of these are required
tutorialProperties = {
    "title": {"type": "string"},
    "container": {"type": "string"},
    "project": project,
    "notebooks": notebooks,
}

tutorial_schema = {
    "$schema": schema_url,
    "title": "Tutorials API Metadata",
    "type": "object",
    "required": [
        "tutorial",
    ],
    "properties": {
        "tutorial": {
            "type": "object",
            "properties": tutorialProperties,
            "required": ["title", "container", "project", "notebooks"],
            "additionalProperties": False,
        }
    },
    "additionalProperties": False,
}


def get_parser():
    parser = argparse.ArgumentParser(
        description="Tutorial Metadata Validator",
        formatter_class=argparse.RawTextHelpFormatter,
    )
    parser.add_argument("filename", help="filename (json) to validate")
    return parser


def main():

    parser = get_parser()

    # If an error occurs while parsing the arguments, the interpreter will exit with value 2
    args, extra = parser.parse_known_args()

    # Show args to the user
    print("file: %s" % args.filename)

    if not os.path.exists(args.filename):
        sys.exit(f"{args.filename} does not exist!")
    data = read_json(args.filename)

    # Top level validate
    if not isinstance(data, dict):
        sys.exit("json data should be a dictionary.")

    for name, tutorial in data.items():
        if name.lower() != name:
            sys.exit(f"tutorial names should be all lowercase. Found {name}")

        # No weird characters
        chars = name.replace("-", "")
        if any(not c.isalnum() for c in chars):
            sys.exit(
                f'tutorial names should have no special characters other than "-". Found {name}'
            )

        # Validate the tutorial
        jsonschema.validate(tutorial, schema=tutorial_schema)

        # We should be able to docker pull
        container = tutorial["container"]

        # Do not allow latest or missing tag
        if ":" not in container or ":latest" in container:
            sys.exit("A tag is required, and it cannot be latest!")

        print(f"Testing pull of {container}")
        retval = os.system(f"docker pull {container}")
        if retval != 0:
            sys.exit(f"Issue pulling {container} - is the name correct?")


if __name__ == "__main__":
    main()

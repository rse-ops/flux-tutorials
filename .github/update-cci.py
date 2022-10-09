#!/usr/bin/env python3

import argparse
import fnmatch
import os
import sys

import yaml

here = os.path.abspath(os.path.dirname(__file__))
root = os.path.dirname(here)


def read_yaml(filename):
    with open(filename, "r") as stream:
        content = yaml.safe_load(stream)
    return content


def recursive_find(base, pattern="tutorial.yaml"):
    for root, _, filenames in os.walk(base):
        for filename in fnmatch.filter(filenames, pattern):
            yield os.path.join(root, filename)


def write_yaml(yaml_dict, filename):
    with open(filename, "w") as filey:
        filey.writelines(yaml.dump(yaml_dict))
    return filename


def get_parser():
    parser = argparse.ArgumentParser(
        description="Contributor CI Data Updater",
        formatter_class=argparse.RawTextHelpFormatter,
    )
    parser.add_argument(
        "--root",
        help="root to search for tutorials",
        default=os.path.join(root, "tutorials"),
    )
    parser.add_argument(
        "--cci",
        help="contributor-ci.yaml file",
        default=os.path.join(root, "contributor-ci.yaml"),
    )

    return parser


def main():

    parser = get_parser()

    # If an error occurs while parsing the arguments, the interpreter will exit with value 2
    args, extra = parser.parse_known_args()

    # Show args to the user
    print("root: %s" % args.root)
    print("cci: %s" % args.cci)

    if not os.path.exists(args.cci):
        sys.exit("File %s does not exist." % args.cci)

    # read in cci.yaml
    data = read_yaml(args.cci)

    if "repos" not in data:
        data["repos"] = []

    # find all tutorial.yaml files
    for tutorial_file in recursive_find(args.root, "tutorial.yaml"):
        tutorial = read_yaml(tutorial_file)
        url = tutorial.get("project", {}).get("github")
        if url:
            data["repos"].append(url)

    # Ensure uniqueness
    data["repos"] = list(set(data["repos"]))
    write_yaml(data, args.cci)


if __name__ == "__main__":
    main()

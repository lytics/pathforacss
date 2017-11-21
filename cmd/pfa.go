package main

import (
	"errors"
	"flag"
	"fmt"
	"os"
	"os/exec"
)

func init() {
	flag.Usage = func() {
		flag.PrintDefaults()
		usageExit()
	}

	flag.Parse()
}

func main() {
	if len(flag.Args()) < 1 {
		flag.Usage()
		return
	}

	// get the command
	method := flag.Args()[0]

	// get the directory name
	var directory string
	if len(flag.Args()) > 1 {
		directory = flag.Args()[1]
	}

	// handle the command
	output, err := handleFunction(method, directory)
	if err != nil {
		fmt.Println(fmt.Sprintf("Error: %v", err))
		os.Exit(0)
	}

	// output result
	if len(output) > 0 {
		fmt.Println(output)
	}
}

func handleFunction(method, directory string) (string, error) {
	var (
		result string
		err    error
	)

	switch method {
	case "newboilerplate":
		err = makeBoilerplate(directory)
		if err != nil {
			return "", err
		}

		return "boilerplate generated", nil
	default:
		flag.Usage()
		return "", nil
	}

	if err != nil {
		return "", err
	}

	// return makeJSON(result), err
	return result, err
}

func directoryExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return true, err
}

func makeBoilerplate(directory string) error {
	// set directory
	if directory == "" {
		directory = "pathforastyles"
	}

	exist, err := directoryExists(directory)
	if err != nil {
		return err
	}

	if exist {
		return errors.New("directory already exists")
	}

	// clone the repo
	cmd := exec.Command("git", "clone", "git@github.com:lytics/pathforacss.git", directory)
	if err := cmd.Run(); err != nil {
		return err
	}

	// unlink from git
	cmd = exec.Command("rm", "-rf", fmt.Sprintf("%s/.git", directory))
	if err := cmd.Run(); err != nil {
		return err
	}
	cmd = exec.Command("rm", fmt.Sprintf("%s/.gitignore", directory))
	if err := cmd.Run(); err != nil {
		return err
	}
	cmd = exec.Command("rm", "-rf", fmt.Sprintf("%s/cmd", directory))
	if err := cmd.Run(); err != nil {
		return err
	}

	return nil
}

func usageExit() {
	fmt.Printf(`
--------------------------------------------------------
*************  PATHFORA BOILERPLATE HELP  **************
--------------------------------------------------------

METHODS:
    [new]
         generates a new Pathfora CSS boilerplate.

         -------
         example:
         -------
              pfa newboilerplate
`)
	os.Exit(1)
}

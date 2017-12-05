const shell = require("shelljs");

shell.rm("-rf", "../release/*");

shell.cd("src/server");
shell.exec("tsc");

shell.cd("../client");
shell.exec("tsc");

shell.cd("../../");

shell.mkdir("-p", "release/www");

shell.cp("-R", "src/server/dist/*", "release/");
shell.cp("-R", "src/client/dist/*", "release/www");

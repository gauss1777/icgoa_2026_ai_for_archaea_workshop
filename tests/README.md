# Literature-demo state regression tests

From the repository root, using Node.js 18 or later:

```sh
node --test tests/tutorial-state.test.cjs
node --check assets/tutorial.js
```

No package installation is required. The tests execute the actual browser script
in a Node VM with a small DOM double and read the real HTML's topic options,
question, fields, control IDs and initial disabled state. They check state and
rendered content; they do not test browser layout, native event dispatch,
accessibility or cross-browser behavior.

Expected behavior:

- A scan captures the topic, question, required fields and ranked records together.
- Editing the topic, question or required fields clears all generated outputs and
  disables brief generation until a new scan runs.
- Building a brief also checks for input changes that did not fire an event.
- A scan with no required fields selected is blocked with a visible explanation.
- Repeated scans replace output; Reset restores the original defaults.

The tests cover all three topics, topic/question/field changes, empty fields and
recovery, repeated scans/builds, eventless edits, building before scanning, and
reset. Retrieval scoring and the synthetic training corpus are unchanged. A
non-topical record can still have a positive lexical score; that is independent
of whether the scan state is current.

For a real-browser smoke check, run the documented local server:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/tutorial-demo.html`, run a methane scan, build a brief,
then switch to ammonia. Confirm that the old results, brief and prompt disappear,
and the Build button stays disabled until another scan. Repeat after editing the
question and toggling a required field. Uncheck all fields and run: no contract or
brief should be produced. Recheck one field, rescan, then try repeated scans and
Reset.
